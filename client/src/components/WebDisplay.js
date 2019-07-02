import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Segment, Header } from 'semantic-ui-react';
import HeaderText from "../styles/HeaderText";
import Colors from "../styles/Colors";


const WebDisplay = () => {
  
  return (
    <>
    <Segment as={Colors} colored="light">
      <Features OS='web'/>
    </Segment>
    <Segment>
      <OSMath OS='web'/>
      <TotalMath />
    </Segment>
  </>
  );
};

export default WebDisplay;