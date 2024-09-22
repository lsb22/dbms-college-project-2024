import { useEffect, useState } from "react";
import apiClient from "../Services/api-client";
import { CanceledError } from "axios";

const useData = <T>(baseUrl: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<T[]>(baseUrl, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { data, error, setData, setError };
};

export default useData;
