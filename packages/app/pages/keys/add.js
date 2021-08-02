import {Formik, Form} from "formik";
import Link from "next/link";
import {useSuccessSnack, useErrorSnack} from "../../util/snackbar.js";
import Button from "../../components/button.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import MainFull from "../../components/main-full.jsx";
import {createKey} from "../../data/entity_key.js";
import {generateKeyToPEM} from "../../util/crypto-helper.js";
import {keySchema} from "../../util/form-schema.js";

export default function AddKey() {
  const [successSnack] = useSuccessSnack();
  const [errorSnack] = useErrorSnack();

  const handleSubmit = (data) => {
    console.log(data);
    createKey(data)
      .then(() => {
        successSnack("Key saved successfully.");
      })
      .catch((err) => {
        errorSnack(`Failed to save key: ${err.message}`);
      });
  };

  const handleGenerateKey = (setter) => {
    generateKeyToPEM()
      .then((pem) => {
        setter("public_key", pem);
        successSnack("Key generated successfully.");
      })
      .catch((err) => {
        console.error(err);
        errorSnack(`Failed to generate key: ${err.message}`);
      });
  };

  return (
    <MainFull>
      <p className="">Add a public key to your account.</p>
      <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={keySchema}>
        {(props) => (
          <Form className="flex flex-col space-y-2 w-full p-2">
            <FormTextInput label="Key name" name="name" />
            <FormTextInput label="Description" name="description" />
            <FormTextInput label="Public key" name="public_key" />
            <div className="flex flex-row justify-between">
              <Link href="/keys">
                <Button type="button" secondary={true} className="mr-2">
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Button type="button" secondary onClick={() => handleGenerateKey(props.setFieldValue)} className="mr-2">
                <i className="fad fa-wand-magic-sparkles mr-2" />
                Generate Key
              </Button>
              <Button type="submit">
                <i className="fad fa-save mr-2" /> Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MainFull>
  );
}
