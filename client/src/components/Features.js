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
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { handleSetPrice } = useContext(MathContext);
  const { handleSetDays } = useContext(MathContext);

  useEffect( () => {
      axios.get(`/api/categories_by_os`,{params: {os: props.OS}})
    .then( res  => {
      setCategories(res.data)
    })
    axios.get(`/api/features`)
    .then(res => setFeatures(res.data))
  },[])
  
  useEffect( () => {
    handleSetPrice(props.OS)
  },[selectedFeatures])
  
  const getSelectedFeatureData = (id) => {
    const selected = features.filter( f => {if (f.id == id) return f})
    handleSetDays(props.OS, ...selected)
  };
    
  const handleChange = (e) => {
    const newFeature = selectedFeatures.includes(e.target.value)
    if (newFeature === false) {setSelectedFeatures([...selectedFeatures, e.target.value])
    }else setSelectedFeatures(selectedFeatures.filter(f => f != e.target.value));
    getSelectedFeatureData(e.target.value);
   //NEED TO HANDLE RADIO BUTTONS AND PRICING CHANGES BASED ON CLICKS AS WELL
  }

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
