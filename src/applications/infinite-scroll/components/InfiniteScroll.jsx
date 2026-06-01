import React, { useEffect, useState } from "react";
import "./style.css";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 18;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (!hasMore) return;

      setIsLoading(true);

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();

        if (json.length === 0) {
          setHasMore(false);
          return;
        }

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

    return () => controller.abort();
  }, [page, hasMore]);

  const handleInfiniteScroll = () => {
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (hasMore && !isLoading && innerHeight + scrollTop >= scrollHeight - 50) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [isLoading, hasMore]);

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div className="app-container">
      <h3>Infinite Scroll App</h3>

      <div className="item-container">
        {data.map((elem) => (
          <div className="item" key={elem.id}>
            <h4>{elem.title}</h4>
            <p>{elem.body.slice(0, 50)}</p>
          </div>
        ))}
      </div>

      {isLoading && <h3>Loading...</h3>}

      {!hasMore && <h3 style={{ textAlign: "center" }}>No more posts</h3>}
    </div>
  );
};

export default InfiniteScroll;
