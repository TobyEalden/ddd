import {selectDeviceType} from "../../../../data/device-type.js";

export default async function handler(req, res) {
  const {id} = req.query;
  const {data, error} = await selectDeviceType(id);

  res.status(200).json(data);
}
