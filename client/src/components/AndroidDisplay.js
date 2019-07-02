import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, Segment, Header } from 'semantic-ui-react';
import HeaderText from "../styles/HeaderText";
import Colors from "../styles/Colors";

const AndroidDisplay = () => {

  return(
    <>
      <Segment as={Colors} colored="dark">
        <Features OS='android'/>
      </Segment>
      <Segment>
        <OSMath OS='android'/>
        <TotalMath />
      </Segment>
    </>
  );
};

export default AndroidDisplay;