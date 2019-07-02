import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container,} from 'semantic-ui-react';

const AndroidDisplay = () => {

  return(
    <Container>
      <h1>Android</h1>
      <Features OS='android'/>
      <OSMath OS='android'/>
      <TotalMath />
    </Container>
  );
};

export default AndroidDisplay;