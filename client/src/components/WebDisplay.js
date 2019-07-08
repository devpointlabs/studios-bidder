import React from 'react';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Segment, } from 'semantic-ui-react';
import Colors from "../styles/Colors";
import styled from "styled-components";


const WebDisplay = (props) => {
  
  return (
    <>
    <Segment as={Colors} colored="light">
      <Container as={FeaturesContainer}>
        <Features 
          OS='web'
          selectedFeatures={props.selectedFeatures}
          setSelectedFeatures={props.setSelectedFeatures}
        />
      </Container>
    </Segment>
    <Segment>
      <OSMath OS='web'/>
      <TotalMath />
    </Segment>
  </>
  );
};

const FeaturesContainer = styled.div`
  padding: 20px;
`;

export default WebDisplay;