import {supabase} from "../../util/supabase-client.js";

export default async function handler(req, res) {
  const {data, error} = await supabase.from("entity_key").select("*");

  res.status(200).json(data);
}
