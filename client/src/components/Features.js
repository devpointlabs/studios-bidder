import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios'; 
import {Form, Container, Header, Radio, } from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";


const Features = (props) => {
  // const [platforms, setPlatforms] = useState([])
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [radioButtons, setRadioButtons] = useState([])
  const { handleSetPrice } = useContext(MathContext);
  const { handleSetDays } = useContext(MathContext);

  useEffect( () => {
    // axios.get(`/api/platforms`)
    //   .then(res=>setPlatforms(res.data))
    var os = ''
    if (props.OS === 'web') os = 3
    else if (props.OS === 'ios') os = 1
    else if (props.OS === 'android') os = 2

    axios.get(`/api/platforms/${os}/categories`)
      .then( res  => setCategories(res.data))

    axios.get(`/api/features_by_platform`, {params: {platform_id: os}})
      .then(res => setFeatures(res.data))
  },[])
  
  useEffect( () => {
    handleSetPrice(props.OS)
  },[props.selectedFeatures, radioButtons])
  
  const getSelectedFeatureData = (id) => {
    const selected = features.filter( f => {if (f.id === parseInt(id)) return f})
    handleSetDays(props.OS, ...selected)
    //DESTRUCTURE SELECTED AND ONLY SEND VALUES WE NEED TO MATH PROVIDER
  };
    
  const handleCheckbox = (e) => {
    if (props.selectedFeatures.includes(e.target.value) === false) {props.setSelectedFeatures([...props.selectedFeatures, e.target.value])
    }else props.setSelectedFeatures(props.selectedFeatures.filter(f => f !== e.target.value));
    getSelectedFeatureData(e.target.value);
  };

  const handleRadio = (catID, fID) => {
    let rbCategories = radioButtons.map( rb => (rb.category))
    if(rbCategories.includes(catID) === false) {
      setRadioButtons([...radioButtons, {category: catID, feature: fID}])
    }else {setRadioButtons([...radioButtons.filter( rb => rb.category !== catID ),{category: catID, feature: fID}])
    props.setSelectedFeatures(props.selectedFeatures.filter(f => f !== fID));
  }
    props.setSelectedFeatures([...props.selectedFeatures, ...radioButtons]);
    // console.log(radioButtons)
    getSelectedFeatureData(fID);
  };

  const isSelected = (id) => {
    let selected = [];
    radioButtons.map( rb => selected.push(rb.feature))
    return selected.includes(id)
  };

  const exclusiveRendering = (catID, is_exclusive) => {
    const correctF = features.filter( f => catID === f.category_id);
    
  
    if (is_exclusive === true) {
      return (
        <>
          {/* {correctF.map( f => { 
            return(
              <Form.Group key={f.id}>
                <Form.Field>
                  <Radio
                    name={f.name}
                    checked={isSelected(f.id)}
                    value={f.id}
                    label={f.name}
                    onChange={() => handleRadio(f.category_id, f.id)}
                    />
                    </Form.Field>
              </Form.Group>
            )})} */}
        </>
        );
      }else {
        return (
          <Form.Group>
            {correctF.map( f => (
              <Form.Input
                checked={props.selectedFeatures.includes(f.id.toString())}
                key={f.id}
                type='checkbox'
                name={f.name}
                value={f.id}
                label={f.name}
                onChange={handleCheckbox}
              />
            ))}
          </Form.Group>
        );
      };
    };

  return (
    <>
        <br/>
        <br/>
        <Form>
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
        </Form >
    </>
  )
};

export default Features;
