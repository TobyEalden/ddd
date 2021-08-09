import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

import LoadingPanel from "./loading-panel.jsx";

import {useDeviceTypeGraph} from "../data/graph.js";
import {useInheritedDeviceTypeBindings} from "../data/device-type.js";

Cytoscape.use(dagre);

export default function DeviceTypeGraph({deviceTypeId, includeFirmware}) {
  const router = useRouter();
  const hierarchy = useDeviceTypeGraph(deviceTypeId);
  const bindings = useInheritedDeviceTypeBindings(deviceTypeId);
  const [graph, setGraph] = useState(null);
  const cy = useRef();

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
                label: "inherit",
              },
              classes: "device-type",
            });
          }
        });

        if (includeFirmware) {
          let previousFirmware = null;

          const firmwareBindingRoot = {};
          bindings.data.forEach((firmware) => {
            if (!firmwareBindingRoot[firmware.device_type.id]) {
              firmwareBindingRoot[firmware.device_type.id] = [];
            }
            firmwareBindingRoot[firmware.device_type.id].push(firmware);
          });

          Object.keys(firmwareBindingRoot).forEach((firmwareDeviceTypeId) => {
            const deviceBindings = firmwareBindingRoot[firmwareDeviceTypeId];
            deviceBindings.forEach((firmware, idx) => {
              elements.push({
                group: "nodes",
                data: {
                  id: firmware.id,
                  label: firmware.name,
                },
                classes:
                  idx === deviceBindings.length - 1 && firmwareDeviceTypeId === deviceTypeId
                    ? "firmware-current"
                    : "firmware-old",
              });

              if (idx === 0) {
                // Connect the first firmware in the chain to the device type.
                elements.push({
                  group: "edges",
                  data: {
                    source: firmware.device_type.id,
                    target: firmware.id,
                    label: "binding",
                  },
                  classes: "firmware",
                });
              } else {
                // Connect subsequent firmware in the chain to the previous firmware.
                elements.push({
                  group: "edges",
                  data: {
                    source: previousFirmware.id,
                    target: firmware.id,
                    label: "updates",
                  },
                  classes: "firmware",
                });
              }
              previousFirmware = firmware;
            });
          });
        }

        const branchDeviceTypeNode = "#22D3EE";
        const branchDeviceTypeText = "#4B5563";
        const otherBranchDeviceTypeNode = "#A5F3FC";
        const otherBranchDeviceTypeText = "#9CA3AF";
        const branchEdge = "#9CA3AF";
        const otherBranchEdge = "#F3F4F6";
        const activeDeviceTypeBorder = "#FA0000";
        const activeFirmwareBorder = "#FB923C";
        const firmwareCurrentNode = "#FCD34D";
        const firmwareOldNode = "#FEF3C7";
        const firmwareEdge = "#9CA3AF";

        const nodeInBranch = (el) => branchIds.includes(el.data("id"));
        const edgeInBranch = (el) => branchIds.includes(el.data("target"));

        const stylesheet = [
          // Catch-all for labels.
          {
            selector: "[label]",
            style: {
              "font-size": "6px",
              color: otherBranchDeviceTypeText,
              label: (el) => el.data("label"),
            },
          },
          // Device Type nodes, colour is determined on whether or not the node is in a branch
          // containing the current (active) Device Type.
          {
            selector: "node.device-type",
            style: {
              "background-color": (el) => (nodeInBranch(el) ? branchDeviceTypeNode : otherBranchDeviceTypeNode),
              "border-color": activeDeviceTypeBorder,
              "border-width": (el) => (el.data("id") === deviceTypeId ? 2 : 0),
              "background-fill": "radial-gradient",
              "background-gradient-stop-colors": (el) =>
                nodeInBranch(el)
                  ? `#0891B2 ${branchDeviceTypeNode} white`
                  : `#22D3EE ${otherBranchDeviceTypeNode} white`,
              "background-gradient-stop-positions": "15 50 70",
            },
          },
          // Device Type edges, non-branch edges are faded slightly.
          {
            selector: "edge.device-type",
            style: {
              width: 1,
              "line-color": (el) => (edgeInBranch(el) ? branchEdge : otherBranchEdge),
            },
          },
          // Device Type labels, non-branch labels are faded slightly.
          {
            selector: "node.device-type[label]",
            style: {
              "font-size": "8px",
              color: (el) => (nodeInBranch(el) ? branchDeviceTypeText : otherBranchDeviceTypeText),
            },
          },
          // Most recent firmware binding nodes.
          {
            selector: "node.firmware-current",
            style: {
              "background-color": firmwareCurrentNode,
              "border-color": activeFirmwareBorder,
              "border-width": 2,
              "background-fill": "radial-gradient",
              "background-gradient-stop-colors": `#D97706 ${firmwareCurrentNode} white`,
              "background-gradient-stop-positions": "15 50 70",
            },
          },
          // Older (overridden) firmware nodes.
          {
            selector: "node.firmware-old",
            style: {
              "background-color": firmwareOldNode,
              "background-fill": "radial-gradient",
              "background-gradient-stop-colors": `${firmwareOldNode} white`,
              "background-gradient-stop-positions": "25 80",
            },
          },
          // Any firmware edge.
          {
            selector: "edge.firmware",
            style: {
              width: 1,
              "line-color": firmwareEdge,
              "line-style": "dotted",
            },
          },
          // Most recent firmware node labels.
          {
            selector: "node.firmware-current[label]",
            style: {
              "font-size": "8px",
              color: branchDeviceTypeText,
            },
          },
          // Older (overridden) firmware node labels.
          {
            selector: "node.firmware-old[label]",
            style: {
              "font-size": "8px",
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
            cy={(cyRef) => {
              cy.current = cyRef;
              cy.current.on("tap", "node.device-type", function (evt) {
                router.push(`/device-type/detail/graph/${evt.target.id()}`);
              });
            }}
          />
        );

        setGraph(rendered);
      });
    }
  }, [hierarchy.loading, bindings.loading, includeFirmware, deviceTypeId]);

  return graph || <LoadingPanel>Loading...</LoadingPanel>;
}
