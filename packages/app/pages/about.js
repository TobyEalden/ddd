import Link from "next/link";

import Button from "../components/button.jsx";
import MainFull from "../components/main-full.jsx";

export default function About() {
  return (
    <MainFull>
      <p className="mt-4">
        Good security practices need a mechanism of reliably determining the device type of connected devices, in order
        to make good security decisions.
      </p>
      <p className="mt-4">
        Fundamentally, we need to describe device types in an interoperable way, in order to make “statements” about
        device types, and by implication device instances.
      </p>
      <p className="mt-4">IoT devices will always present a potential security threat.</p>

      <p className="mt-4">
        Understanding what the device is and where it comes from, helps inform meaningful security assessments of risk.
      </p>

      <p className="mt-4">
        In turn, this can lead to the better planning of risk mitigations, which are better targeted.
      </p>

      <p className="mt-4">Each individual physical device has a conceptual "device type".</p>

      <p className="mt-4">
        From a security perspective this device type can be empirically defined as as a cluster of simpler risk
        attributes.
      </p>

      <p className="mt-4">
        From a physical perspective, it is clear that devices have clustered self similar properties, which in turn
        inform the risk stratification. Typical properties are
      </p>
      <ul>
        <li>Manufacturers: legal commercial entity responsible for the design and production of the device</li>
        <li>
          Product variant: what is the product line (this could be hierarchical). Generally this relates to the physical
          similarity of product (same bill of materials/same production process)
        </li>
        <li>Firmware variant: relates to the virtual software image layered on top of the physical hardware</li>
      </ul>
      <div className="flex justify-center p-4">
        <Link href="/">
          <Button type="button" className="px-20 py-4">
            OK
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
