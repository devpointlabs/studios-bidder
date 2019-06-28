import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Container, Header, Item } from 'semantic-ui-react';
// import { AuthContext } from '../providers/AuthProvider';
import { MathContext} from '../providers/MathProvider';

const Features = (props) => {
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  // const auth = useContext(AuthContext)
  const { handleSetPrice } = useContext(MathContext)

  useEffect( () => {
    axios.all([
      axios.get(`/api/categories`,{params: {os: 'android'}} ),
      axios.get(`/api/features`,{params: {category_id: 1 }})
    ])
    .then(axios.spread((categoryRes, featureRes) => {
      setCategories(categoryRes.data)
      setFeatures(featureRes.data)
    }))
  },[])

  const ExclusiveRendering = (props) => {
    const CorrectFeature = (props) => {
      var correctF = features.filter( f => 
        props.catID === f.category_id,
        // correctF.push(f)
      )
      return (correctF)
    }

    CorrectFeature.map(f => {
      if (props.isExclusive) {
        return (
          f.map(a => (
          <Form.Group>
            <Form.Input
            type="radio"
            name={a.name}
            />
            <Item.description>{a.description}</Item.description>
          </Form.Group>))
        );
      }
      return (
        f.map(a => (
        <Form.Group>
          <Form.Input
          type="checkbox"
          name={a.name}
          />
          <Item.description>{a.description}</Item.description>
        </Form.Group>))
      );
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // //////
    // .then( res => {
    //   props.add(res.data);
    // })
    handleSetPrice(props.OS)
  }

  return (
    <>
      <ul>
        <Form onSubmit={handleSubmit()}>
          {categories.map(c => 
          <Container key={c.id} id={c.id}>
            <Header as="h1">{c.name}</Header>
            <ExclusiveRendering  catID={c.id} isExclusive={c.is_exclusive} />
          </Container>
          )}
          <Form.Button>Submit for Quote</Form.Button>
        </Form >
      </ul>
    </>
  )
};

export default Features;
