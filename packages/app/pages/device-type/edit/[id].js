import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {deviceTypeSchema} from "../../../util/form-schema.js";
import {saveActor} from "../../../data/actor.js";
import {supabase} from "../../../util/supabase-client.js";
import {useSelect} from "../../../data/use-select.js";
import {useSuccessSnack, useErrorSnack} from "../../../util/snackbar.js";

export default function EditDeviceType() {
  const [successSnack] = useSuccessSnack();
  const [errorSnack] = useErrorSnack();
  const router = useRouter();
  const deviceType = useSelect(() => supabase.from("actor").select().eq("id", router.query.id).neq("status", 99));

  const handleSubmit = (data) => {
    console.log(data);
    saveActor(data)
      .then(() => {
        successSnack("Device type saved successfully.");
        router.replace(`/device-type/detail/${data.id}`);
      })
      .catch((err) => {
        errorSnack(`Failed to device type: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {deviceType.error && <div>ERROR! {deviceType.error.message}</div>}
      {deviceType.data && (
        <>
          <PageHeading heading={`Edit device type '${deviceType.data[0].name}'`} />
          <Formik initialValues={deviceType.data[0]} onSubmit={handleSubmit} validationSchema={deviceTypeSchema}>
            {(props) => (
              <Form className="flex flex-col space-y-2 w-full p-2">
                <FormDetail label="Id" detail={props.values.id} pre={true} />
                <FormTextInput label="Device type" name="name" />
                <FormTextInput label="Description" name="description" />
                <div className="flex flex-row justify-between">
                  <Link href="/device-type">
                    <Button type="button" secondary={true}>
                      Close
                    </Button>
                  </Link>
                  <div />
                  <Button type="submit">
                    <i className="fad fa-save mr-2" /> Save Device Type
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </MainFull>
  );
}
