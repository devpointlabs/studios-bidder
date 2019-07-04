import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";


const Features = (props) => {
  const [platforms, setPlatforms] = useState([])
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [value, setValue] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { handleSetPrice } = useContext(MathContext);

  useEffect( () => {
    axios.get(`/api/platforms`)
    .then(res=>setPlatforms(res.data))

  //     axios.get(`/api/${}/categories`)
  //   .then( res  => {
  //     setCategories(res.data)
  //   })
  //   axios.get(`/api/features`)
  //     .then(res => setFeatures(res.data))
  },[])

  const updateSelectedFeatures = () => {
    
  }

  const handleChange = (e) => {
    debugger
    // this will track what is clicked. Then spread new value into it. Then set selected features again. Pass in the mathProvider state price. 
    // button function on each checkbox. Then update state in MathProvider of what ID's have been clicked. Then pass it down into here so we have the info for the estimate. 
    setSelectedFeatures(e.value)
    setValue(e.value)}

  const exclusiveRendering = (catID, is_exclusive) => {
    let correctF = features.filter( f => catID === f.category_id);
    if (is_exclusive === true) {
      return (
        <>
          {correctF.map( f => (
            <Form.Group key={f.id}>
              <Form.Radio
                name={f.name}
                checked={value === f.id}
                value={f.id}
                label={f.name}
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
                key={f.id}
                type='checkbox'
                name={f.name}
                checked={value === f.id}
                value={f.id}
                label={f.name}
                onChange={handleChange}
              />
            ))}
          </Form.Group>
        );
      };
    };

    const handleSubmit = () => {

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
          {/* <Form.Button>Submit for Quote</Form.Button> */}
        </Form >
    </>
  )
};

export default Features;
