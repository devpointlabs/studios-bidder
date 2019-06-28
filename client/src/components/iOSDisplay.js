import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
// import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';

const WebDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    axios.get(`/api/categories`,{params: {os: 'ios'}} )
      .then( res => {
        setCategories(res.data)
      });
  },[]);

  return (
    <>
      <ul>
        <h1>iOS</h1>
        {categories.map(c => 
          <Container key={c.id} id={c.id}>
            <Segment>{c.name}</Segment>
            {/* <Features catID={c.id} exclusivity={c.is_exclusive}/> */}
          </Container>
          )}
          <OSMath OS='iOS' />
      </ul>
    </>
    );
};

export default WebDisplay;