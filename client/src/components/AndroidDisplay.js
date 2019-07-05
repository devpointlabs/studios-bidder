import React from 'react';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Segment } from 'semantic-ui-react';
import Colors from "../styles/Colors";
import styled from "styled-components";

const AndroidDisplay = (props) => {

  return(
    <>
      <Segment as={Colors} colored="dark">
        <Container as={FeaturesContainer}>
          <Features 
            OS='android'
            setSelectedFeatures={props.setSelectedFeatures}
            selectedFeatures={props.selectedFeatures} />
        </Container>
      </Segment>
      <Segment>
        <OSMath OS='android'/>
        <TotalMath />
      </Segment>
    </>
  );
};

const FeaturesContainer = styled.div`
  padding: 20px;
`;


export default AndroidDisplay;