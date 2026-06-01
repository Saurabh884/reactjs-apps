import React from "react";
import "./style.css";

const CustomInfiniteScrollItem = ({ item }) => {
  return (
    <div className="item" key={item.id}>
      <h4> {item.title}</h4>
      <p> {item.body.slice(0, 50)}</p>
    </div>
  );
};

export default CustomInfiniteScrollItem;
