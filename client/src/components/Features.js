import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Grid, Radio, Card, Input, Checkbox, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
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
  
  
  const handleCheckbox = (e) => {
    const {value} = e.target;
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
    return selected.includes(id);
  };

  const exclusiveRendering = (catID, is_exclusive) => {
    const correctF = features.filter( f => catID === f.category_id);
    
    if (is_exclusive === true) {
      return (
      //   <Spacing>
      //     <Grid columns={3}>
      //       <Grid.Row columns="3">
      //         {correctF.map( f => (
      //           <>
      //           <RowSpacing>
      //             <Grid.Column centered>
      //               {/* <Card as={CardSelectBorder} key={f.id}>
      //                   <Card.Content>
      //                     <Card.Header>{f.name}</Card.Header>
      //                     <Card.Description>{f.description}</Card.Description>
      //                   </Card.Content>
      //               </Card> */}
      //               <div class="card-wrapper">
      //                 <input class="c-card" type="checkbox" id="1" value="1" checked="checked"/>
      //                 <div class="card-content">
      //                   <div class="card-state-icon"></div>
      //                   <label for="1">
      //                     <div class="image"></div>
      //                     <h4>{f.name}</h4>
      //                     <h5>{f.description}</h5>
      //                     <p class="small-meta dim">{f.description}</p>
      //                   </label>
      //                 </div>
      //               </div>
      //             </Grid.Column>
      //           </RowSpacing>
      //         </>
      //         ))}
      //       </Grid.Row>
      //     </Grid>
      //   </Spacing>
      //   );
      // }else {
      //   return (
      //     <Spacing>
      //     <Grid columns={3} centered>
      //       <Grid.Row columns={3}>
      //         {correctF.map( f => (
      //           <>
      //             <RowSpacing>
      //               <Grid.Column centered>
      //                 <Card as={CardSelectBorder} key={f.id}>
      //                     <Card.Content>
      //                       <Card.Header>{f.name}</Card.Header>
      //                       <Card.Description>{f.description}</Card.Description>
      //                     </Card.Content>
      //                 </Card>
      //               </Grid.Column>
      //             </RowSpacing>
      //           </>
      //         ))}
      //       </Grid.Row>
      //     </Grid>
      //   </Spacing>
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


const CardSelectBorder = styled.div`
  border-radius: 4px;
  border: 5px solid 
  border-color: rgb(111, 242, 175);
`;


export default Features;
