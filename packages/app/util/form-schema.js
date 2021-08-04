import * as yup from "yup";

export const keySchema = yup.object().shape({
  name: yup.string().min(4, "Key name must be at least 4 letters").required("Please enter a name for the key"),
  description: yup.string(),
  public_key: yup
    .string()
    .min(100, "Public key format key invalid")
    .required("Please enter the public key in PEM format"),
  private_key: yup.string().min(100, "Private key format key invalid"),
});

export const deviceTypeSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Device type name must be at least 4 letters")
    .required("Please enter a name for the device type"),
  description: yup.string().nullable(),
  issuer_fingerprint: yup.string().required("Please select the issuing key"),
  // manufacturer: yup.string().uuid().required("Please select the manufacturer."),
});

export const profileSchema = yup.object().shape({
  name: yup.string().min(2, "Please enter at least 2 letters").required("Please enter your name").default(""),
  bio: yup.string().default("").nullable(),
  email: yup.string().email().default(""),
});
