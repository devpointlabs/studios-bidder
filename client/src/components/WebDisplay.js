import React from 'react';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Segment, Header } from 'semantic-ui-react';
import Colors from "../styles/Colors";
import styled from "styled-components";


const WebDisplay = (props) => {
  
  return (
    <>
    <Segment as={NoLine}>
      <Container as={FeaturesContainer}>
        <Features OS='web'/>
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

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background-color: rgb(129, 104, 177) !important;
`

export default WebDisplay;