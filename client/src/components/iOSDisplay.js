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
    <Segment as={NoLine}>
      <Container as={FeaturesContainer}>
        <Features 
          OS='ios'
          setSelectedFeatures={props.setSelectedFeatures}
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

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background-color: rgb(94, 66, 150) !important;
`


export default IOSDisplay;