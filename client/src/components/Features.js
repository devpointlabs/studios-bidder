import React, {useState, useEffect, useContext,} from 'react';
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
  const { handleSetDays, } = useContext(MathContext);

  useEffect( () => {
    // axios.get(`/api/platforms`)
    //   .then(res=>setPlatforms(res.data))
    var os = '';
    if (props.OS === 'web') os = 3;
    else if (props.OS === 'ios') os = 1;
    else if (props.OS === 'android') os = 2;

    axios.get(`/api/platforms/${os}/categories`)
      .then( res  => setCategories(res.data));

    axios.get(`/api/features_by_platform`, {params: {platform_id: os}})
      .then(res => setFeatures(res.data));
  },[props.OS]);
  
  
  const handleCheckbox = (e) => {
    const {value} = e.target;
    const {selectedFeatures, OS, setSelectedFeatures } = props;
    if (selectedFeatures.includes(value) === false) {
      setSelectedFeatures([...selectedFeatures, value])
    }else {
      setSelectedFeatures(selectedFeatures.filter(f => f !== value));
    }
    handleSetDays(OS, ...features.filter( f => {if (f.id === parseInt(value)) return f; else return null}), false);
  };
  
  const handleRadio = (catID, fID) => {
    const { OS,} = props;
    let rbCategories = radioButtons.map( rb => (rb.category));
    if(rbCategories.includes(catID) === false) {
      setRadioButtons([...radioButtons, {category: catID, feature: fID}]);
    }else {
      setRadioButtons([...radioButtons.filter( rb => rb.category !== catID ),{category: catID, feature: fID}]);
    };
    handleSetDays(OS, ...features.filter( f => {if (f.id === parseInt(fID)) return f; else return null}),true);
  // console.log(radioButtons)
  };

  const isSelected = (id) => {
    let selected = [];
    radioButtons.map( rb => selected.push(rb.feature));
    return selected.includes(id);
  };

  const exclusiveRendering = (catID, is_exclusive) => {
    const correctF = features.filter( f => catID === f.category_id);
    
    if (is_exclusive === true) {
      return (
        <>
          {correctF.map( f => { 
            return(
              <Form.Group key={f.id}>
                <Form.Field>
                  <Radio
                    // get radio buttons to show checked if applicable when page is re rendered/////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // defaultChecked={radioButtons.includes(f.id.toString())}
                    name={f.name}
                    checked={isSelected(f.id)}
                    value={f.id}
                    label={f.name}
                    onChange={() => handleRadio(f.category_id, f.id)}
                    />
                    </Form.Field>
              </Form.Group>
            )})}
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
