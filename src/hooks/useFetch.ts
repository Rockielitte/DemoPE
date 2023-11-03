import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";

type Props<T> = {
  endpoint: string;
  method?: string;
  body?: Object;
};

const useFetch = <T = unknown>({
  endpoint,
  method = "GET",
  body,
}: Props<T>) => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<AxiosError<T, any>>();
  const refecth = useCallback((query?: string) => {
    setisLoading(true);
    axios<T>({
      url: `${"https://6543c49601b5e279de20edcb.mockapi.io/"}${endpoint}?${
        query || ""
      }`,
      data: body,
      method: method,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        setData(res.data), setisLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError<T>(err)) {
          setError(err);
          setisLoading(false);
        }
      });
  }, []);
  useEffect(() => {
    setisLoading(true);
    axios<T>({
      url: `${"https://6543c49601b5e279de20edcb.mockapi.io/"}${endpoint || ""}`,
      data: body,
      method: method,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        setData(res.data), setisLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError<T>(err)) {
          setError(err);
          setisLoading(false);
        }
      });
  }, []);

  return { isLoading, data, error, refecth };
};

export default useFetch;
