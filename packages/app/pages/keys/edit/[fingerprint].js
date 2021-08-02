import {Formik, Form} from "formik";
import Link from "next/link";
import Button from "../../../components/button.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import MainFull from "../../../components/main-full.jsx";
import {saveKey} from "../../../data/entity_key.js";
import {keySchema} from "../../../util/form-schema.js";
import {useRouter} from "next/router";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";

export default function EditKey() {
  const router = useRouter();
  const keyData = useSelect(() => supabase.from("entity_key").select().eq("fingerprint", router.query.fingerprint));

  const handleSubmit = (data) => {
    console.log(data);
    saveKey(data)
      .then(() => {
        console.log("Key saved");
      })
      .catch((err) => {
        console.log("Failed to save key: ", err.message);
      });
  };

  return (
    <MainFull>
      {keyData.error && <div>ERROR! {keyData.error.message}</div>}
      {keyData.data && (
        <>
          <p className="">Edit a public key on your account.</p>
          <Formik initialValues={keyData.data[0]} onSubmit={handleSubmit} validationSchema={keySchema}>
            {(props) => (
              <Form className="flex flex-col space-y-2 w-full p-2">
                <FormTextInput disabled={true} label="Fingerprint" name="fingerprint" />
                <FormTextInput disabled={true} label="Public key" name="public_key" />
                <FormTextInput label="Key name" name="name" />
                <FormTextInput label="Description" name="description" />
                <div className="flex flex-row justify-between">
                  <Link href="/keys">
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
