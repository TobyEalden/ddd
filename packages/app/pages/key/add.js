import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../components/button.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import MainFull from "../../components/main-full.jsx";

import {createKey} from "../../data/profile-key.js";
import {generatePublicKeyToPEM, generatePrivateKeyToPEM} from "../../util/crypto-helper.js";
import {keySchema, validateSubmit} from "../../util/form-schema.js";
import {useSnacks} from "../../util/snackbar.js";

export default function AddKey() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();

  const handleSubmit = (data) => {
    console.log(data);
    createKey(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Key saved successfully.");
        router.replace("/key");
      })
      .catch((err) => {
        errorSnack(`Failed to save key: ${err.message}`);
      });
  };

  const handleGeneratePublicKey = (setter) => {
    generatePublicKeyToPEM()
      .then((pem) => {
        setter("public_key", pem);
        successSnack("Key generated successfully.");
      })
      .catch((err) => {
        console.error(err);
        errorSnack(`Failed to generate key: ${err.message}`);
      });
  };

  const handleGeneratePrivateKey = (setter) => {
    generatePrivateKeyToPEM()
      .then((pem) => {
        setter("public_key", pem.public_key);
        setter("private_key", pem.private_key);
        console.log(pem.private_key);
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
          <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={(evt) => validateSubmit(evt, props)}>
            <FormTextInput label="Key name" name="name" />
            <FormTextInput label="Description" name="description" />
            <FormTextInput label="Public key" name="public_key" />
            <FormTextInput label="Private key" name="private_key" />
            <div className="flex flex-row justify-between">
              <Link href="/key">
                <Button type="button" secondary={true} className="mr-2">
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Button
                type="button"
                secondary
                onClick={() => handleGeneratePrivateKey(props.setFieldValue)}
                className="mr-2"
              >
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
