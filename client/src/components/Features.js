////////////////// <FORM
//////////////////    map by category
//////////////////    <Form.Group NAME/ KEY/ ETC --> CATEGORY NAME/ ID
//////////////////        IF categories NON EXCLUSIVE 
//////////////////           MAP BY FEATURES W CATid  
//////////////////           <Form.Input type radios
//////////////////        IF categories EXCLUSIVE 
//////////////////           MAP BY FEATURES W CATid  
//////////////////           <Form.Input type checkbox
//////////////////   < FORM submit 

import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Container, Header, Item } from 'semantic-ui-react';
import { AuthContext } from '../providers/AuthProvider';

const Features = (props) => {
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [showExclusive, setShowExclusive] = useState([])
  const [showNonExclusive, setShowNonExclusive] = useState([])
  const auth = useContext(AuthContext)

  // props.exclusivity
  // props.catID

  useEffect( () => {
    axios.get(`/api/categories`,{params: {os: 'android'}} )
      .then( res => 
        {
          // console.table(res.data)
          setCategories(res.data)
        }
        )
    axios.get(`/api/features`,{params: {category: props.catID }})
      .then( res => // {debugger} 
        {
          // console.table(res.data)
          setFeatures(res.data)}
    )
  },[])

  return (

    <>
      <ul>
        <Form>
          {categories.map(c => 
          <Container key={c.id} id={c.id}>
            <Header as="h1">{c.name}</Header>
            {/* <Features catID={c.id} exclusivity={c.is_exclusive}/> */}
            {//if c.is_exclusive === false
            // https://reactjs.org/docs/conditional-rendering.html
              c.features.map(f => 
                <Form.Group>
                  <Form.Input
                  type="radio"
                  name={f.name}
                  />
                  <Item.description>{f.description}</Item.description>

                </Form.Group>) 
            }
          </Container>
          )}
        </Form>
      </ul>
    </>
    )
};

export default Features;





// const Features = (props) => {
//   const [features, setFeatures] = useState([]);
//   const [showExclusive, setShowExclusive] = useState([])
//   const [showNonExclusive, setShowNonExclusive] = useState([])
//   const auth = useContext(AuthContext)



  // useEffect( () => {
  //   axios.get(`/api/features`,{params: {category: props.catID }})
  //   .then( res => // {debugger} 
  //     {setFeatures(res.data)}
  //   )
  //   .catch(err => //{debugger}
  //     )
  // },[]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
// /////////////////////////////////
//       .then( res => {
//         props.add(res.data);
//         props.toggleForm();
//       })
//     };

//   const ExclusiveCategory = () => (
//     features.map(f => 
//       <Container key={f.id} id={f.id}>
//         <Segment>{f.name}</Segment>
//         <Features catID={c.id} exclusivity={c.is_exclusive}/>
//       </Container>

//       // <Form onSubmit={this.handleSubmit} key={catID}>
//       //   <From.Group grouped>
//       //     {/* MAP HERE>>>  */}
//       //     <Form.Input
//       //     label={feature.name} 
//       //     control='input' 
//       //     type='radio' 
//       //     />
//       //   </From.Group>
//       // </Form>


//   {categories.map(c => 
//     <Container key={c.id} id={c.id}>
//       <Segment>{c.name}</Segment>
//       <Features catID={c.id} exclusivity={c.is_exclusive}/>
//     </Container>
//     )}