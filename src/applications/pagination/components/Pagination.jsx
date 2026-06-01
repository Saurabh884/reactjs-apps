import React, { useEffect, useState } from "react";
import "./style.css";
import PaginationItem from "./PaginationItem";
import usePaginate from "../../../hooks/usePaginate";

const Pagination = () => {
  let PRODUCTS_PER_PAGE = 9;

  const { data, isError, isLoading, page, setPage, totalPage } = usePaginate(
    "https://dummyjson.com/products",
    PRODUCTS_PER_PAGE,
  );

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
