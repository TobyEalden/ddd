import {useEffect, useState} from "react";
import Cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

import LoadingPanel from "./loading-panel.jsx";

import {useDeviceTypeGraph} from "../data/graph.js";
import {useInheritedDeviceTypeBindings} from "../data/device-type.js";

Cytoscape.use(dagre);

export default function DeviceTypeGraph({deviceTypeId, includeFirmware}) {
  const hierarchy = useDeviceTypeGraph(deviceTypeId);
  const bindings = useInheritedDeviceTypeBindings(deviceTypeId);
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    if (!hierarchy.loading && hierarchy.data && !bindings.loading && bindings.data) {
      import("react-cytoscapejs").then((component) => {
        const elements = [];

        console.log("building graph");

        // Build array of all device type ids that are in the branch of the current device type.
        const branchIds = hierarchy.data.ancestors.map((a) => a.ancestor_id || a.descendant_id);
        branchIds.push(deviceTypeId);

        hierarchy.data.graph.forEach((treeNode) => {
          elements.push({
            group: "nodes",
            data: {
              id: treeNode.device_type.id,
              label: treeNode.device_type.name,
            },
            classes: "device-type",
          });

          if (treeNode.parent_id) {
            elements.push({
              group: "edges",
              data: {
                source: treeNode.parent_id,
                target: treeNode.descendant_id,
                label: "inherits",
              },
              classes: "device-type",
            });
          }
        });

        if (includeFirmware) {
          bindings.data.forEach((binding) => {
            elements.push({
              group: "nodes",
              data: {
                id: binding.firmware.id,
                label: binding.firmware.name,
              },
              classes: "firmware",
            });

            elements.push({
              group: "edges",
              data: {
                source: binding.device_type.id,
                target: binding.firmware.id,
              },
              classes: "firmware",
            });
          });
        }

        const immediateNode = "#22D3EE";
        const immediateText = "#4B5563";
        const siblingNode = "#CFFAFE";
        const siblingText = "#9CA3AF";
        const immediateEdge = "#9CA3AF";
        const siblingEdge = "#F3F4F6";
        const activeNodeBorder = "#EC4899";

        const nodeInBranch = (el) => branchIds.includes(el.data("id"));
        const edgeInBranch = (el) => branchIds.includes(el.data("target"));

        const stylesheet = [
          {
            selector: "node.device-type",
            style: {
              "background-color": (el) => (nodeInBranch(el) ? immediateNode : siblingNode),
              "border-color": activeNodeBorder,
              "border-width": (el) => (el.data("id") === deviceTypeId ? 2 : 0),
            },
          },
          {
            selector: "edge.device-type",
            style: {
              width: 1,
              "line-color": (el) => (edgeInBranch(el) ? immediateEdge : siblingEdge),
            },
          },
          {
            selector: "node.device-type[label]",
            style: {
              "font-size": "8px",
              color: (el) => (nodeInBranch(el) ? immediateText : siblingText),
              label: (el) => el.data("label"),
            },
          },
          {
            selector: "node.firmware",
            style: {
              "background-color": "lime",
            },
          },
          {
            selector: "edge.firmware",
            style: {
              width: 1,
              "line-color": immediateEdge,
              "line-style": "dotted",
            },
          },
          {
            selector: "node.firmware[label]",
            style: {
              "font-size": "8px",
              color: (el) => (nodeInBranch(el) ? immediateText : siblingText),
              label: (el) => el.data("label"),
            },
          },
        ];

        const Component = component.default;
        const rendered = (
          <Component
            className="flex-grow"
            style={{minHeight: "200px"}}
            elements={elements}
            userZoomingEnabled={true}
            stylesheet={stylesheet}
            layout={{name: "dagre"}}
          />
        );
        setGraph(rendered);
      });
    }
  }, [hierarchy.loading, bindings.loading, includeFirmware]);

  return graph || <LoadingPanel>Loading...</LoadingPanel>;
}
