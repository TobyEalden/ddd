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

import {useDeviceType, useDeviceTypeHierarchy} from "../../../data/device-type.js";
import SectionHeading from "../../../components/section-heading.jsx";
import DeviceTypeSignatures from "../../../components/device-type-signatures.jsx";
import DeviceTypeBindings from "../../../components/device-type-bindings.jsx";

Cytoscape.use(dagre);

export default function DetailDeviceType() {
  const router = useRouter();
  const deviceType = useDeviceType(router.query.id);
  const hierarchy = useDeviceTypeHierarchy(router.query.id);
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    if (!hierarchy.loading && !deviceType.loading && deviceType.data && hierarchy.data) {
      import("react-cytoscapejs").then((component) => {
        const elements = [];

        console.log("building graph");

        hierarchy.data.push({device_type: deviceType.data[0]});

        let edge = null;
        hierarchy.data.forEach((treeNode, idx) => {
          if (!treeNode.device_type) {
            return;
          }

          elements.push({
            data: {
              id: treeNode.device_type.id,
              label: treeNode.device_type.name,
            },
          });

          if (edge) {
            elements.push({
              data: {
                source: edge.device_type.id,
                target: treeNode.device_type.id,
                label: "inherits",
              },
            });
          }
          edge = treeNode;
        });

        const Component = component.default;
        const rendered = (
          <Component
            className="flex-grow"
            style={{minHeight: "200px"}}
            elements={elements}
            userZoomingEnabled={false}
            layout={{name: "dagre"}}
          />
        );
        setGraph(rendered);
      });
    }
  }, [hierarchy.loading, deviceType.loading]);

  return (
    <MainFull>
      {deviceType.error && <ErrorPanel>ERROR! {deviceType.error.message}</ErrorPanel>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Details for '${deviceType.data[0].name}'`} />
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
          {graph}
        </>
      )}
    </MainFull>
  );
}
