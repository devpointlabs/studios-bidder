import React, {useState, useEffect, } from 'react';
import axios from 'axios';

const WebDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    axios.get(`/api/categories`)
      .then( res => 
        setCategories(res.data))
  })

  return (

    <>
      <ul>
        {categories.slice(0, -1).map(c => 
          <li>{c.name}</li>
          )}
      </ul>
    </>
    )
};

export default WebDisplay;