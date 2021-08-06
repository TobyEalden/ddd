import Cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";

import {useDeviceType} from "../../../data/device-type.js";
import SectionHeading from "../../../components/section-heading.jsx";
import DeviceTypeSignatures from "../../../components/device-type-signatures.jsx";
import DeviceTypeBindings from "../../../components/device-type-bindings.jsx";
import {useDeviceTypeGraph} from "../../../data/graph.js";

Cytoscape.use(dagre);

export default function DetailDeviceType() {
  const router = useRouter();
  const deviceType = useDeviceType(router.query.id);
  const hierarchy = useDeviceTypeGraph(router.query.id);
  const [graph, setGraph] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    if (!hierarchy.loading && hierarchy.data) {
      import("react-cytoscapejs").then((component) => {
        const elements = [];

        console.log("building graph");

        // Build array of all device type ids that are in the branch of the current device type.
        const branchIds = hierarchy.data.ancestors.map((a) => a.ancestor_id || a.descendant_id);
        branchIds.push(router.query.id);

        hierarchy.data.graph.forEach((treeNode, idx) => {
          elements.push({
            group: "nodes",
            data: {
              id: treeNode.device_type.id,
              label: treeNode.device_type.name,
            },
          });

          if (treeNode.parent_id) {
            elements.push({
              group: "edges",
              data: {
                source: treeNode.parent_id,
                target: treeNode.descendant_id,
                label: "inherits",
              },
            });
          }
        });

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
            selector: "node",
            style: {
              "background-color": (el) => (nodeInBranch(el) ? immediateNode : siblingNode),
              "border-color": activeNodeBorder,
              "border-width": (el) => (el.data("id") === router.query.id ? 2 : 0),
            },
          },
          {
            selector: "edge",
            style: {
              width: 1,
              "line-color": (el) => (edgeInBranch(el) ? immediateEdge : siblingEdge),
            },
          },
          {
            selector: "node[label]",
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
  }, [hierarchy.loading]);

  const toggleGraph = () => {
    setShowGraph(!showGraph);
  };

  return (
    <MainFull>
      {deviceType.error && <ErrorPanel>ERROR! {deviceType.error.message}</ErrorPanel>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Details for '${deviceType.data[0].name}'`}>
            <div
              className="bg-paper rounded hover:bg-primary hover:text-primary-inverted p-2 text-primary-dark cursor-pointer"
              onClick={toggleGraph}
            >
              <i className={`fad ${showGraph ? "fa-times" : "fa-diagram-project"}`} />
            </div>
          </PageHeading>
          {!showGraph && (
            <div className="flex flex-col space-y-2 w-full p-2">
              <FormDetail label="Id" detail={deviceType.data[0].id} pre={true} />
              <FormDetail label="Device type" detail={deviceType.data[0].name} />
              <FormDetail label="Description" detail={deviceType.data[0].description || "n/a"} />
              <FormDetail label="Model" detail={deviceType.data[0].model || "n/a"} />
              <FormDetail label="Manufacturer" detail={deviceType.data[0].organisation.name || "n/a"} />
              <FormDetail label="Timestamp" detail={deviceType.data[0].updated_at || Date.now()} pre={true} />
              <SectionHeading heading="Signatures" />
              <DeviceTypeSignatures deviceTypeId={router.query.id} />
              <SectionHeading heading="Firmware Bindings" />
              <DeviceTypeBindings deviceTypeId={router.query.id} />
              <div className="flex flex-row justify-between">
                <Link href="/device-type">
                  <Button type="button" secondary={true}>
                    Close
                  </Button>
                </Link>
                <div className="flex-grow" />
                <Link href={`/device-type/edit/${deviceType.data[0].id}`}>
                  <Button type="button">
                    <i className="fad fa-edit mr-2" /> Edit
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {showGraph && graph}
        </>
      )}
    </MainFull>
  );
}
