import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiErrorResponse } from "../types/ApiResponses";

interface UseResourceReturn<T, P> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchResource: (url: string, payload?: P) => Promise<void>;
}

const useResource = <T, P = undefined>(): UseResourceReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResource = async (url: string, payload?: P) => {
    setLoading(true);
    setError(null);

    console.log(url, payload);

    try {
      const response = await axios.post(url, payload);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMessage = axiosError.response?.data as ApiErrorResponse;
      setError(errorMessage?.message || "Something went wrong");
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchResource };
};

export default useResource;
