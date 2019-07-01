import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
// import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';
import TotalMath from "./TotalMath";


const WebDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    axios.get(`/api/categories`,{params: {os: 'android'}} )
      .then( res => {
        setCategories(res.data) 
      });
  },[]);

  return (
    <>
      <ul>
        <h1>Android</h1>
        {categories.map(c => 
          <Container key={c.id} id={c.id}>
            <Segment>{c.name}</Segment>
            {/* <Features catID={c.id}/> */}
          </Container>
          )}
          <OSMath OS='android' />
          < TotalMath />
      </ul>
    </>
  );
};

export default WebDisplay;