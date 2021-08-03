import {Formik, Form} from "formik";
import Link from "next/link";
import Button from "../../../components/button.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import {saveKey} from "../../../data/entity_key.js";
import {keySchema} from "../../../util/form-schema.js";
import {useRouter} from "next/router";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";
import {useSuccessSnack, useErrorSnack} from "../../../util/snackbar.js";
import PageHeading from "../../../components/page-heading.jsx";

export default function EditKey() {
  const [successSnack] = useSuccessSnack();
  const [errorSnack] = useErrorSnack();
  const router = useRouter();
  const keyData = useSelect(() =>
    supabase.from("entity_key").select().eq("fingerprint", router.query.fingerprint).neq("status", 99)
  );

  const handleSubmit = (data) => {
    console.log(data);
    saveKey(data)
      .then(() => {
        successSnack("Key saved successfully.");
      })
      .catch((err) => {
        errorSnack(`Failed to save key: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {keyData.error && <div>ERROR! {keyData.error.message}</div>}
      {keyData.data && (
        <>
          <PageHeading heading={`Edit key '${keyData.data[0].name}'`} />
          <Formik initialValues={keyData.data[0]} onSubmit={handleSubmit} validationSchema={keySchema}>
            {(props) => (
              <Form className="flex flex-col space-y-2 w-full p-2">
                <FormDetail label="Fingerprint" detail={props.values.fingerprint} pre={true} />
                {/* <FormTextInput disabled={true} label="Public key" name="public_key" /> */}
                <FormTextInput label="Key name" name="name" />
                <FormTextInput label="Description" name="description" />
                <div className="flex flex-row justify-between">
                  <Link href="/key">
                    <Button type="button" secondary={true}>
                      Close
                    </Button>
                  </Link>
                  <div />
                  <Button type="submit">
                    <i className="fad fa-save mr-2" /> Save Key
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
