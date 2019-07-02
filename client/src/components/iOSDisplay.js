import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Header, Segment } from 'semantic-ui-react';
import HeaderText from "../styles/HeaderText";
import Colors from "../styles/Colors";

const IOSDisplay = () => {
  
  return(
    <>
    <Segment as={Colors} colored="medium-dark">
      <Features OS='ios'/>
    </Segment>
    <Segment>
      <OSMath OS='ios'/>
      <TotalMath />
    </Segment>
  </>
  );
};

export default IOSDisplay;