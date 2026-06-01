import React, { useEffect, useState } from "react";
import "./style.css";
import PaginationItem from "./PaginationItem";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  let PRODUCTS_PER_PAGE = 9;

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`,
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

  if (isLoading) return <h3>Loading........</h3>;
  if (isError) return <div>{isError}</div>;
  return (
    <div className="app-container">
      <h2>Pagination app</h2>
      <div className="items-container">
        {data.length > 0 &&
          data.map((item) => <PaginationItem key={item.id} item={item} />)}
      </div>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          PREV
        </button>
        {[...Array(totalPage).keys()].map((num) => (
          <button
            className={`${page === num + 1 ? "isActive" : ""}`}
            onClick={() => setPage(num + 1)}
            key={num}
          >
            {num + 1}
          </button>
        ))}
        <button
          disabled={page === totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Pagination;
