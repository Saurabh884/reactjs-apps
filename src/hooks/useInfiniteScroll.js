import React, { useEffect, useState } from "react";

const useInfiniteScroll = (url, LIMIT) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (!hasMore) return;
      try {
        setIsLoading(true);
        setIsError(null);
        const res = await fetch(`${url}?_limit=${LIMIT}&_page=${page}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        const json = await res.json();
        if (json.length === 0) {
          setHasMore(false);
          return;
        }
        console.log("json", json);
        setData((prev) => [...prev, ...json]);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
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
  }, [page, hasMore]);

  const handleIntersection = () => {
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (!isLoading && hasMore && innerHeight + scrollTop >= scrollHeight - 40) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleIntersection);

    return () => {
      window.removeEventListener("scroll", handleIntersection);
    };
  }, [isLoading, hasMore]);

  return {
    data,
    isLoading,
    isError,
    hasMore,
    page,
  };
};

export default useInfiniteScroll;
