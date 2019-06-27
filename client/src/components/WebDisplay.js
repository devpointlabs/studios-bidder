import React, {useState, useEffect, } from 'react';
import axios from 'axios';
// import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';

const WebDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    axios.get(`/api/categories`,{params: {os: 'web'}} )

      .then( res => {
        console.table(res.data)
        setCategories(res.data)
      }
        )
  },[])

  return (
    <>
      <ul>
        {categories.map(c => 
          <Container key={c.id} id={c.id}>
            <Segment>{c.name}</Segment>
            {/* {generateFeatures(c.id)} */}
            {/* <Features key={f.id} {...features} */}
            {/* <Features catID={c.id}/> */}
          </Container>
          )}
      </ul>
    </>
    )
};

export default WebDisplay;