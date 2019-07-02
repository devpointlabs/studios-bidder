import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, } from 'semantic-ui-react';

const IOSDisplay = () => {
  
  return(
    <Container>
      <h1>iOS</h1>
      <Features OS='ios'/>
      <OSMath OS='ios'/>
      <TotalMath />
    </Container>
  );
};

export default IOSDisplay;