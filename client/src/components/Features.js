import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";


const Features = (props) => {
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [value, setValue] = useState('');
  // const auth = useContext(AuthContext)
  const { handleSetPrice } = useContext(MathContext)

  useEffect( () => {
      axios.get(`/api/categories_by_os`,{params: {os: props.OS}})
    .then( res  => {
      setCategories(res.data)
      console.table(res.data)
    })
    axios.get(`/api/features`)
      .then(res => setFeatures(res.data))
  },[])


  const handleChange = (e) => {

    setValue(e.value)}

  const exclusiveRendering = (catID, is_exclusive) => {
    let correctF = features.filter( f => catID === f.category_id);
    console.log(correctF)

    if (is_exclusive === true) {
      return (
        <>
          {correctF.map( f => (
            <Form.Group>
              <Form.Radio
                name={f.name}
                checked={value === f.id}
                value={f.id}
                label={f.description}
                onChange={handleChange}
                />
            </Form.Group>
          ))}
        </>
        );
      }else {
        return (
          <Form.Group>
            {correctF.map( f => (
              <Form.Input
                type='checkbox'
                name={f.name} 
                label={f.description}
              />
            ))}
          </Form.Group>
        );
      };
    };
  

  const handleSubmit = (e) => {
    // e.preventDefault();
    // //////
    // .then( res => {
    //   props.add(res.data);
    // })
    // handleSetPrice(props.OS)
  }

  return (
    <>
        <br/>
        <br/>
        <Form onSubmit={handleSubmit()}>
          {categories.map(c => 
          <>
            <Container textAlign="center" key={c.id} id={c.id} as={Colors} colored="white">
              <Header as={DarkText} fSize="medium">{c.name}</Header>
              {exclusiveRendering(c.id, c.is_exclusive)}
            </Container>
            <br/>
            <br/>
            <br/>
          </>
          )}
          <Form.Button>Submit for Quote</Form.Button>
        </Form >
    </>
  )
};

export default Features;
