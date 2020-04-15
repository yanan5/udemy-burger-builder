import React, { useState, useEffect, useRef } from "react";
import useHttp from "../hooks/http";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { setFilteredIngredients } = props;

  const [searchTitle, setSearchTitle] = useState("");
  const [httpState, sendRequest] = useHttp();
  const { isLoading, data } = httpState;
  
  const inputRef = useRef();
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTitle === inputRef.current.value) {
        const query =
          searchTitle.trim().length === 0
            ? ""
            : `?orderBy="title"&equalTo="${searchTitle.trim()}"`;
        ;
        sendRequest(
          `https://react-hooks-update-3be73.firebaseio.com/ingredients.json${query}`,
          "GET",
          null,
          {
            type: "FILTER_INGREDIENTS",
          }
        );
      }
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTitle, sendRequest, inputRef]);

  useEffect(() => {
    if (data) {
      const keys = Object.keys(data);
      const transformedIngredients = keys.map((key) => ({
        ...data[key],
        id: key,
      }));
      setFilteredIngredients(transformedIngredients);
    }
  }, [data, setFilteredIngredients]);
  
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading....</span>}
          <input
            type="text"
            value={searchTitle}
            ref={inputRef}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
