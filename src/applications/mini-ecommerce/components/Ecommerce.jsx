import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import "./style.css";

const Ecommerce = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryInput, setCategoryInput] = useState([]);
  const [ratingsStar, setRatingsStar] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        const json = await res.json();

        setData(json);
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
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const json = await res.json();

    setCategory(json);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategories = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategoryInput((prev) => [...prev, value]);
    } else {
      setCategoryInput((prev) => prev.filter((item) => item !== value));
    }
  };

  const filteredData = data.filter((item) => {
    const searchTerm = input.toLowerCase();

    const matchedSearchTerms =
      item.title.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);

    const matchedCategories =
      categoryInput.length === 0 || categoryInput.includes(item.category);

    const matchedRatings =
      ratingsStar === 0 || Math.ceil(item.rating.rate) === ratingsStar;

    return matchedSearchTerms && matchedCategories && matchedRatings;
  });

  if (isLoading) return <h3>Loading.....</h3>;
  if (isError) return <div>{isError}</div>;

  return (
    <div className="app-container">
      <div className="filter-container">
        <div className="categories">
          <p>All Categories</p>
          {category.map((item) => (
            <div key={item}>
              <p>
                <span>
                  <input
                    type="checkbox"
                    value={item}
                    checked={categoryInput.includes(item)}
                    onChange={handleCategories}
                  />
                </span>{" "}
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="ratings-filter">
          <p>Rating</p>

          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="rating-option">
              <input
                type="radio"
                value={rating}
                checked={ratingsStar === rating}
                onChange={(e) => setRatingsStar(Number(e.target.value))}
              />

              <div className="stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaRegStar
                    key={index}
                    className={index < rating ? "filled-star" : "empty-star"}
                  />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="product-container">
        <div className="input-container">
          <input
            className="input"
            type="text"
            placeholder="Enter title or category"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="item-container">
          {filteredData.length === 0 ? (
            <h2>No data available</h2>
          ) : (
            filteredData.map((item) => (
              <div className="item" key={item.id}>
                <div className="image-container">
                  <img className="image" src={item.image} alt={item.category} />
                </div>
                <h4 className="title">{item.title.slice(0, 50)}</h4>
                <div className="rating">
                  {Array.from(
                    { length: Math.ceil(item.rating.rate) },
                    (_, index) => {
                      return (
                        <span key={index}>
                          <FaRegStar />
                        </span>
                      );
                    },
                  )}
                </div>
                <p className="category">{item.category}</p>
                <p className="description">
                  {item.description.length >= 70
                    ? item.description.slice(0, 70) + "...."
                    : item.description}
                </p>
                <p className="price">{item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
