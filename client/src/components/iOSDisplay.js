import React, {useState, useEffect, } from 'react';
import axios from 'axios';
// import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';

const WebDisplay = () => {
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    // axios.get(`/api/categories/ios`,{params: {is_web: false, is_ios: true, is_android: false}} )
    axios.get(`/api/categories`,{params: {is_web: false, is_ios: true, is_android: false}} )
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
            {/* <Features catID={c.id}/> */}
          </Container>
          )}
      </ul>
    </>
    )
};

export default WebDisplay;