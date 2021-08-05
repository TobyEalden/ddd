import {useEffect, useState} from "react";

import {supabase} from "../util/supabase-client.js";

export function useSubscribe(table, selector, ...args) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from(table)
      .on("*", () => {
        selector(...args).then((response) => setPayload(response));
      })
      .subscribe();

    selector(...args).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, args);

  return payload;
}
