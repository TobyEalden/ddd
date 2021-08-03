import useSWR from "swr";
import {supabase} from "../util/supabase-client.js";

export default function useKeys() {
  // const fetcher = (select) => {
  //   return supabase
  //     .from("actor_key")
  //     .select(select)
  //     .then((response) => {
  //       if (response.error) {
  //         throw error;
  //       }
  //       return response.data;
  //     });
  // };
  // return useSWR("*", fetcher);

  return useSWR("actor_key", () => {
    return supabase
      .from("actor_key")
      .select()
      .then((response) => {
        if (response.error) {
          throw error;
        }
        return response.data;
      });
  });
}
