import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

import ActorClaims from "../../../components/actor-claims.jsx";
import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";

import {useDeviceType} from "../../../data/actor.js";

export default function DetailDeviceType() {
  const router = useRouter();
  const deviceType = useDeviceType(router.query.id);
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    import("react-cytoscapejs").then((component) => {
      const Component = component.default;
      const rendered = <Component elements={elements} style={{width: "600px", height: "600px"}} />;
      setGraph(rendered);
    });
  }, []);

  const elements = [
    {data: {id: "one", label: "Node 1"}, position: {x: 0, y: 0}},
    {data: {id: "two", label: "Node 2"}, position: {x: 100, y: 0}},
    {data: {source: "one", target: "two", label: "Edge from Node1 to Node2"}},
  ];

  return (
    <MainFull>
      {deviceType.error && <ErrorPanel>ERROR! {deviceType.error.message}</ErrorPanel>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Details for '${deviceType.data[0].name}'`} />
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Device type" detail={deviceType.data[0].name} />
            <FormDetail label="Description" detail={deviceType.data[0].description || "n/a"} />
            <FormDetail label="Id" detail={deviceType.data[0].id} pre={true} />
            <FormDetail label="Timestamp" detail={deviceType.data[0].updated_at || Date.now()} pre={true} />
            <FormDetail label="Signed by" detail={deviceType.data[0].actor_key_public.profile.name} />
            <FormDetail label="Signing key" detail={deviceType.data[0].actor_key_public.name} />
            <FormDetail
              label="Claims"
              detail={
                <ActorClaims actorType="device type" actorId={router.query.id} className="mt-2 border-t-2 pt-2" />
              }
            />
            <div className="flex flex-row justify-between">
              <Link href="/device-type">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link href={`/device-type/delete/${deviceType.data[0].id}`}>
                <Button type="button" className="mr-2" secondary={true}>
                  <i className="fad fa-trash mr-2" /> Delete
                </Button>
              </Link>
              <Link href={`/device-type/edit/${deviceType.data[0].id}`}>
                <Button type="button">
                  <i className="fad fa-edit mr-2" /> Edit
                </Button>
              </Link>
            </div>
            {graph}
          </div>
        </>
      )}
    </MainFull>
  );
}
