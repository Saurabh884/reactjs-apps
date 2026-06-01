import { useEffect, useState } from "react";

const usePaginate = (url, PRODUCTS_PER_PAGE) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const res = await fetch(
          `${url}?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        const json = await res.json();

        setData(json?.products);
        setTotalPage(Math.ceil(json?.total / PRODUCTS_PER_PAGE));
      } catch (error) {
        if (error instanceof Error) {
          if (error.message !== "AbortError") {
            return;
          }
          setIsError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [page]);
  return {
    data,
    isError,
    isLoading,
    page,
    setPage,
    totalPage,
  };
};
export default usePaginate;
