import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { Ticker } from "../shared/types";

export const useFetchStocks = () => {
  const LIMIT = 30;

  const [items, setItems] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState("");

  const getTickers = useCallback(
    async (search?: string) => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/tickers?limit=${LIMIT}&apiKey=${
            import.meta.env.VITE_API_KEY
          }`,
          { params: { search: search } }
        );
        setItems((prev) =>
          search ? response.data.results : [...prev, ...response.data.results]
        );
        setNextUrl(response.data.next_url);
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          toast.error(err.response.data.error ?? "Failed to fetch tickers");
        }
      } finally {
        setLoading(false);
      }
    },
    [LIMIT]
  );

  const loadMore = useCallback(async () => {
    if (!nextUrl) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `${nextUrl}&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      setItems((prev) => [...prev, ...response.data.results]);
      setNextUrl(response.data.next_url);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.error(err.response.data.error ?? "Failed to fetch tickers");
      }
    } finally {
      setLoading(false);
    }
  }, [nextUrl]);

  return { items, loading, nextUrl, getTickers, loadMore };
};
