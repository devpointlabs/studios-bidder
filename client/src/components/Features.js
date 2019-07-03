import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Grid, Radio, Card, Input, Checkbox, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";
import styled from "styled-components"

const Features = (props) => {
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [value, setValue] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { handleSetPrice } = useContext(MathContext);

  useEffect( () => {
      axios.get(`/api/categories_by_os`,{params: {os: props.OS}})
    .then( res  => {
      setCategories(res.data)
    })
    axios.get(`/api/features`)
      .then(res => setFeatures(res.data))
  },[])

  const updateSelectedFeatures = () => {
    
  }

  const handleChange = (e) => {
    // debugger
    // this will track what is clicked. Then spread new value into it. Then set selected features again. Pass in the mathProvider state price. 
    // button function on each checkbox. Then update state in MathProvider of what ID's have been clicked. Then pass it down into here so we have the info for the estimate. 
    setSelectedFeatures(e.value)
    setValue(e.value)}

  const exclusiveRendering = (catID, is_exclusive) => {
    let correctF = features.filter( f => catID === f.category_id);
    if (is_exclusive === true) {
      return (
        <Spacing>
          <Grid columns={3}>
            <Grid.Row columns="3">
              {correctF.map( f => (
                <>
                <RowSpacing>
                  <Grid.Column centered>
                    <Card as={CardSelectBorder} key={f.id}>
                        <Card.Content>
                          <Card.Header>{f.name}</Card.Header>
                          <Card.Description>{f.description}</Card.Description>
                        </Card.Content>
                    </Card>
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
                      <Card as={CardSelectBorder} key={f.id}>
                          <Card.Content>
                            <Card.Header>{f.name}</Card.Header>
                            <Card.Description>{f.description}</Card.Description>
                          </Card.Content>
                      </Card>
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

    const handleSubmit = () => {

    }

  return (
    <Container textAlign="center">
        <br/>
        <br/>
        <Form onSubmit={handleSubmit()}>
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
          <Form.Button inverted>Submit for Quote</Form.Button>
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
