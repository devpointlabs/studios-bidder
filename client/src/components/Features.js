import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Grid, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import FeatureCard from './FeatureCard';
import DarkText from "../styles/DarkText";
import styled from "styled-components"

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
  
  
  const handleCheckbox = (catID, value) => {
    // debugger
    // const value = e.currentTarget.attributes.value.nodeValue;
    const {selectedFeatures, OS, setSelectedFeatures } = props;
    if (selectedFeatures.includes(value) === false) {setSelectedFeatures([...selectedFeatures, value])
    }else {setSelectedFeatures(selectedFeatures.filter(f => f !== value));
    };
    handleSetDays(OS, ...features.filter( f => {if (f.id === parseInt(value)) return f; else return null}), false);
  };
  
  const handleRadio = (catID, fID) => {
    const { OS,} = props;
    if(radioButtons.map( rb => (rb.category)).includes(catID) === false) {setRadioButtons([...radioButtons, {category: catID, feature: fID}]);
    }else {setRadioButtons([...radioButtons.filter( rb => rb.category !== catID ),{category: catID, feature: fID}]);
    };
    handleSetDays(OS, ...features.filter( f => {if (f.id === parseInt(fID)) return f; else return null}),true);
  };

  const isSelected = (id) => {
    let selected = [];
    radioButtons.map( rb => selected.push(rb.feature));
    props.selectedFeatures.map( sf => selected.push(sf))
    console.log(selected)
    return selected.includes(id);
  };

  const exclusiveRendering = (catID, is_exclusive) => {
    const correctF = features.filter( f => catID === f.category_id);
    
    if (is_exclusive === true) {
      return (
        <Spacing>
          <Grid columns={3} centered>
            <Grid.Row columns="3">
              {correctF.map( f => (
                <>
                <RowSpacing>
                  <Grid.Column centered>
                    <FeatureCard onClickFunction={handleRadio} isSelected={isSelected} f={f}/>
                  </Grid.Column>
                </RowSpacing>
              </>
              ))}
            </Grid.Row>
          </Grid>
        </Spacing>
        );
      }else {
        return (
          <Spacing>
            <Grid columns={3} centered>
              <Grid.Row columns={3}>
                {correctF.map( f => (
                  <>
                    <RowSpacing>
                      <Grid.Column centered>
                        <FeatureCard onClickFunction={handleCheckbox} isSelected={isSelected} f={f}/>
                      </Grid.Column>
                    </RowSpacing>
                  </>
                ))}
              </Grid.Row>
            </Grid>
          </Spacing>
        );
      };
    };

  return (
    <Container textAlign="center">
        <br/>
        <br/>
        <Form>
          {categories.map(c => 
          <>
            <Container textAlign="center" key={c.id} id={c.id}>
              <CategoryContainer>
              <Header as={DarkText} fSize="medium">{c.name}</Header>
              {exclusiveRendering(c.id, c.is_exclusive)}
              </CategoryContainer>
            </Container>
            <Spacing/>
          </>
          )}
        </Form >
    </Container>
  )
};

const CategoryContainer = styled.div`
  padding: 50px 20px 50px 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  margin-top:10px;
  border-radius: 4px;
  background: white;
`;

const Spacing = styled.div`
  padding: 5px 30px 30px 30px !important;
`;

const RowSpacing = styled.div`
  padding: 30px 10px 10px 10px !important;
`;

export default Features;
