import React from 'react';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Segment } from 'semantic-ui-react';
import Colors from "../styles/Colors";
import styled from "styled-components";

const IOSDisplay = (props) => {
  
  return(
    <>
    <Segment as={Colors} colored="medium-dark">
      <Container as={FeaturesContainer}>
        <Features 
          OS='ios'
          handleSelections={props.handleSelections}
          selectedFeatures={props.selectedFeatures}
          />
      </Container>
    </Segment>
    <Segment>
      <OSMath OS='ios'/>
      <TotalMath />
    </Segment>
  </>
  );
};

const FeaturesContainer = styled.div`
  padding: 20px;
`;

export default IOSDisplay;