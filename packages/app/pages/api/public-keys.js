import {supabase} from "../../util/supabase-client.js";

export default async function handler(req, res) {
  const {data, error} = await supabase.from("claim").select("*");

  res.status(200).json(data);
}
