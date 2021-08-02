import * as yup from "yup";

export const keySchema = yup.object().shape({
  name: yup.string().min(4, "Key name must be at least 4 letters").required("Please enter a name for the key"),
  description: yup.string(),
  public_key: yup
    .string()
    .min(100, "Public key format key invalid")
    .required("Please enter the public key in PEM format"),
});
