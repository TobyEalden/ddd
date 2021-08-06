import useSWR from "swr";
import {supabase} from "../util/supabase-client.js";

export default function useKeys() {
  // const fetcher = (select) => {
  //   return supabase
  //     .from("profile_key")
  //     .select(select)
  //     .then((response) => {
  //       if (response.error) {
  //         throw error;
  //       }
  //       return response.data;
  //     });
  // };
  // return useSWR("*", fetcher);

  return useSWR("profile_key", () => {
    return supabase
      .from("profile_key")
      .select()
      .then((response) => {
        if (response.error) {
          throw error;
        }
        return response.data;
      });
  });
}
