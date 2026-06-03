import React, { useEffect, useState } from "react";
import "./style.css";

const Ecommerce = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

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
        if (controller.signal.aborted) {
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

  if (isLoading) return <h3>Loading.....</h3>;
  if (isError) return <div>{isError}</div>;

  return (
    <div className="item-container">
      {data.length > 0 &&
        data.map((item) => (
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
        ))}
    </div>
  );
};

export default Ecommerce;
