import React, { useEffect, useState } from "react";
import "./style.css";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import CustomInfiniteScrollItem from "./CustomInfiniteScrollItem";

const CustomInfiniteScroll = () => {
  const LIMIT = 15;

  const { data, isError, isLoading, hasMore, page } = useInfiniteScroll(
    "https://jsonplaceholder.typicode.com/posts",
    LIMIT,
  );

  if (isError) return <div>{isError}</div>;

  return (
    <div className="app-container">
      <h3>Custom Infinite Scroll</h3>
      <div className="item-container">
        {data.length > 0 &&
          data.map((item) => (
            <CustomInfiniteScrollItem key={item.id} item={item} />
          ))}
      </div>
      {isLoading && <h3>Loading....</h3>}
      {!hasMore && <p>No more posts</p>}
    </div>
  );
};

export default CustomInfiniteScroll;
