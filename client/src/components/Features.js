import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Grid, Radio, Card, Input, Checkbox, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import FeatureCard from './FeatureCard';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";
import styled from "styled-components"
import "./Features.less"

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

  // const toggleBorder = () => {
  //   //  style={complete ? styles.selected : {}}

  //   // if YES selected return 
  //   // return {}

  //   // if NOT selected return 
  //   return selected = () => {
  //     borderRadius: '4px !important',
  //     border: '5px solid !important', 
  //     borderColor: 'rgb(9, 0, 41) !important'
  //   }
  // }

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
                    {/* <CardGroup> */}
                        {/* <CardStyles> */}
                        {/* <div onClick={handleRadio} as={isSelected ? CardSelectBorder : CardUnselectBorder} key={f.id} value={f.id} id={f.id}> */}
                        <FeatureCard onClickFunction={handleRadio} isSelected={isSelected} f={f}/>
                          {/* <Card onClick={handleRadio} as={isSelected(f.id) ? CardSelectBorder : CardUnselectBorder} key={f.id} value={f.id}>
                              <Card.Content content={f.id} className={f.id} value={f.id}>
                                <Card.Header>{f.name}</Card.Header>
                                <Card.Description>{f.description}</Card.Description>
                                <Card.Meta>Base Days: {f.base_days}</Card.Meta>
                              </Card.Content>
                          </Card> */}
                        {/* </div> */}
                        {/* </CardStyles> */}
                    {/* </CardGroup> */}
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
                      {/* <CardGroup> */}
                        {/* <CardStyles> */}
                        <FeatureCard onClickFunction={handleCheckbox} isSelected={isSelected} f={f}/>
                        {/* <div style={{zIndex: '1000'}} onClick={handleCheckbox} as={isSelected ? CardSelectBorder : CardUnselectBorder} key={f.id} value={f.id} id={f.id}>
                          <Card onClick={handleCheckbox} as={isSelected(f.id) ? CardSelectBorder : CardUnselectBorder} key={f.id}  value={f.id}>
                              <Card.Content>
                                <Card.Header>{f.name}</Card.Header>
                                <Card.Description>{f.description}</Card.Description>
                                <Card.Meta>Base Days: {f.base_days}</Card.Meta>
                              </Card.Content>
                          </Card>
                        </div> */}
                        {/* </CardStyles> */}
                      {/* </CardGroup> */}
                    </Grid.Column>
                  </RowSpacing>
                </>
              ))}
            </Grid.Row>
          </Grid>
        </Spacing>
      //   <>
      //     {correctF.map( f => { 
      //       return(
      //         <Form.Group key={f.id}>
      //           <Form.Field>
      //             <Radio
      //               // get radio buttons to show checked if applicable when page is re rendered/////////////////////////////////////////////////////////////////////////////////////////////////////////
      //               // defaultChecked={radioButtons.includes(f.id.toString())}
      //               name={f.name}
      //               checked={isSelected(f.id)}
      //               value={f.id}
      //               label={f.name}
      //               onChange={() => handleRadio(f.category_id, f.id)}
      //               />
      //               </Form.Field>
      //         </Form.Group>
      //       )})}
      //   </>
      //   );
      // }else {
      //   return (
      //     <Form.Group>
      //       {correctF.map( f => (
      //         <Form.Input
      //           checked={props.selectedFeatures.includes(f.id.toString())}
      //           key={f.id}
      //           type='checkbox'
      //           name={f.name}
      //           value={f.id}
      //           label={f.name}
      //           onChange={handleCheckbox}
      //         />
      //       ))}
      //     </Form.Group>
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
              <FormContainer>
              <Header as={DarkText} fSize="medium">{c.name}</Header>
              {exclusiveRendering(c.id, c.is_exclusive)}
              </FormContainer>
            </Container>
            <Spacing/>
          </>
          )}
        </Form >
    </Container>
  )
};

const FormContainer = styled.div`
  padding: 20px;
  /* border-radius: 4px; */
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  margin-top:10px;
  border-radius: 4px;
  background: white;
  padding: 20px; 
`;
const Spacing = styled.div`
  padding: 5px 30px 30px 30px !important;
`;

const RowSpacing = styled.div`
  padding: 5px 10px 10px 10px !important;
`;


const styles = {
  selected: {
    borderRadius: '4px !important',
    border: '5px solid !important', 
    borderColor: 'rgb(111, 242, 175) !important'
  },
  unselected: {
    borderRadius: '4px !important',
    border: '5px solid !important', 
    borderColor: 'rgb(9, 0, 41) !important'
  }
}


const CardSelectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: rgb(111, 242, 175) !important;
`;

const CardUnselectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: rgb(9, 0, 41) !important;
`;

// const CardStyles = styled(Card)`
//   /* height: ;
//   width: ; */
// `

// const CardGroup = styled(Card.Group)`
//   /* padding: 30px;
//   display: flex;
//   justify-content: center; */
// `


export default Features;
