import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {  
  const [searchTitle, setSearchTitle] = useState("");
  const { setFilteredIngredients } = props;
  const inputRef = useRef();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if(searchTitle === inputRef.current.value) {
        const query = searchTitle.trim().length === 0 ? '' : `?orderBy="title"&equalTo="${searchTitle.trim()}"`
        fetch('https://react-hooks-update-3be73.firebaseio.com/ingredients.json' + query, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          if(data) {
            const keys = Object.keys(data);
            const transformedIngredients = keys.map(key => ({
              ...data[key],
              id: key
            }));
            setFilteredIngredients(transformedIngredients);
          }      
        })
      }
    }, 500)
    return () => clearTimeout(timerId)
  }, [searchTitle, setFilteredIngredients, inputRef])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
            value={searchTitle}
            ref={inputRef}
            onChange={(e) => setSearchTitle(e.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
