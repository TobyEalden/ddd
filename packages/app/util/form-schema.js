import {setNestedObjectValues} from "formik";
import * as yup from "yup";

export function validateSubmit(evt, {handleSubmit, setTouched, validateForm}) {
  return validateForm().then((errors) => {
    if (Object.keys(errors).length) {
      setTouched(setNestedObjectValues(errors, true));
      evt.preventDefault();
      return false;
    } else {
      return handleSubmit(evt);
    }
  });
}

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
  description: yup.string(),
  // issuer_fingerprint: yup.string().required("Please select the issuing key").default(""),
  organisation_id: yup.string().required("Please select the manufacturer").uuid().default(""),
  model: yup.string().default(""),
  manufacturer_link: yup.string().url().default(""),
});

export const profileSchema = yup.object().shape({
  name: yup.string().min(2, "Please enter at least 2 letters").required("Please enter your name").default(""),
  bio: yup.string().default("").nullable(),
  email: yup.string().email().default(""),
  organisation_id: yup.string().required("Please select an organisation").uuid().default(""),
});

export const organisationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Please enter at least 2 letters")
    .required("Please enter the organisation name")
    .default(""),
  domain: yup
    .string()
    .required("Please enter the organsation email domain, e.g. 'microsoft.com'")
    .trim()
    .matches(
      /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/,
      "Not a valid domain, e.g. 'microsoft.com'"
    )
    .default(""),
});

export const firmwareSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Firmware name must be at least 4 letters")
    .required("Please enter a name for the firmware"),
  description: yup.string().nullable(),
  download_url: yup.string().url().default("").nullable(),
  payload_url: yup.string().url().default("").nullable(),
  payload_hash: yup.string().default("").nullable(),
  version_number: yup.string().default("").nullable(),
  organisation_id: yup.string().required("Please select the manufacturer").uuid().default(""),
});

export const siteSchema = yup.object().shape({
  name: yup.string().min(4, "Site name must be at least 4 letters").required("Please enter a name for the site"),
  description: yup.string().nullable(),
  site_type_id: yup.string().required("Please select the site type").uuid().default(""),
  connection_type_id: yup.string().required("Please select the connection type").uuid().default(""),
  organisation_id: yup.string().required("Please select the site organisation").uuid().default(""),
  subnet: yup.string().default(""),
  ip: yup.string(),
  location: yup.string(),
});

export const deviceInstallationSchema = yup.object().shape({
  serial_number: yup
    .string()
    .min(4, "Device installation serial number must be at least 4 letters")
    .required("Please enter a serial number"),
  serial_extra: yup.string().default(""),
  site_id: yup.string().required("Please select the site").uuid().default(""),
  device_type_id: yup.string().required("Please select the device type").uuid().default(""),
  install_date: yup.date().required("Please specify the installation date"),
  active_date: yup.date().required("Please specify the activation date"),
});
