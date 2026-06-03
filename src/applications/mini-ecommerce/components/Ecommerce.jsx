import React, { useEffect, useState } from "react";
import "./style.css";

const Ecommerce = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [input, setInput] = useState("");

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

  console.log("data", data);
  const filteredData = data.filter((item) => {
    const searchTerm = input.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  });

  if (isLoading) return <h3>Loading.....</h3>;
  if (isError) return <div>{isError}</div>;

  return (
    <div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Enter title"
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
  );
};

export default Ecommerce;
