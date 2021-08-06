import {supabase} from "../util/supabase-client.js";

export function createInheritance(tableName, parentId, childId, issuer_fingerprint) {
  return supabase
    .from(tableName)
    .select()
    .eq("descendant_id", parentId)
    .order("depth")
    .then((response) => {
      if (response.error) {
        return response;
      }

      const childNodes = [];
      if (response.data.length === 0) {
        childNodes.push({
          ancestor_id: null,
          descendant_id: childId,
          parent_id: null,
          depth: 1,
          ancestor_depth: 0,
          signed_by: issuer_fingerprint,
        });
      } else {
        // Child depth is one deeper than parent depth.
        const childDepth = response.data[0].depth + 1;
        let leafAdded = false;
        response.data.forEach((node) => {
          if (!node.ancestor_id) {
            // Ignore the root.
            return;
          }
          if (node.ancestor_id === parentId && node.parent_id === parentId) {
            // Add the leaf node.
            childNodes.push({
              ancestor_id: parentId,
              descendant_id: childId,
              parent_id: parentId,
              depth: node.depth + 1,
              ancestor_depth: node.depth,
              signed_by: issuer_fingerprint,
            });
            leafAdded = true;
          }

          childNodes.push({
            ancestor_id: node.ancestor_id,
            descendant_id: childId,
            parent_id: parentId,
            depth: node.depth + 1,
            ancestor_depth: node.ancestor_depth,
            signed_by: node.signed_by,
          });
        });

        if (!leafAdded) {
          childNodes.push({
            ancestor_id: parentId,
            descendant_id: childId,
            parent_id: parentId,
            depth: childDepth,
            ancestor_depth: childDepth - 1,
            signed_by: issuer_fingerprint,
          });
        }
      }

      return supabase.from(tableName).insert(childNodes);
    });
}
