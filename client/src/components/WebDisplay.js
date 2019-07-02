import React, {useState, useEffect, } from 'react';
import axios from 'axios';
import OSMath from './OSMath';
import Features from './Features';
import TotalMath from './TotalMath';
import {Container, } from 'semantic-ui-react';

const WebDisplay = (props) => {
  
  return (
    <Container>
      <h1>Web</h1>
      <Features OS='web' handleSubmit={props.handleSubmit}/>
      <OSMath OS='web'/>
      <TotalMath />
    </Container>
  );
};

export default WebDisplay;