import React, { useEffect, useState } from "react";
import "./style.css";

const AutoComplete = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [showResult, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log("cache", input);
      setData(cache[input]);
      return;
    }
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await res.json();

    setData(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);
  // console.log("data", data);
  return (
    <div className="app-container">
      <h3>Autocomplete app</h3>
      <input
        className="input"
        type="text"
        placeholder="Search item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResult && (
        <div className="recipe-container">
          {data.map((item) => (
            <span className="recipe-item" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
