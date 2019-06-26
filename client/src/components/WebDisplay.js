import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import {Container, Segment } from 'semantic-ui-react';

const WebDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect( () => {
    axios.get(`/api/categories`,{params: {is_web: true}} )
      .then( res => 
        setCategories(res.data)
        )
  },[])

  // const generateFeatures = (category) => {
  //   axios.get(`/api/features`, {params: {category_id: category}})
  //   .then( res => {
  //     setFeatures(res.data)
  //     console.log(features)
  //   });
  //   return(
  //     features.map(f => 
  //       <Segment.Content>{f.name}</Segment.Content>)
  //   )
  // };



  return (
    <>
      <ul>
        {categories.map(c => 
          <Container key={c.id} id={c.id}>
            <Segment>{c.name}</Segment>
            {/* {generateFeatures(c.id)} */}
            {/* <Features key={f.id} {...features} */}
          </Container>
          )}
      </ul>
    </>
    )
};

export default WebDisplay;