import React from "react";
import "./style.css";

const PaginationItem = ({ item }) => {
  return (
    <div className="item">
      <p>{item.brand}</p>
      <p>{item.price}</p>
      <img className="image" src={item.thumbnail} alt={item.category} />
    </div>
  );
};

export default PaginationItem;
