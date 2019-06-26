import React from 'react';
import { Container, Button, } from "semantic-ui-react";
import "./MainDisplay.css"
import axios from "axios";

const MainDisplay = () => {

  const handleWeb = () => {
    axios.get(``)
    
  };
  const handleiOS = () => {

  };
  const handleAndroid = () => {

  };

  return(
    <div>

      <h1 Align="center">Estimate Your App Cost</h1>

      <div className="container1">
        <h1> Main Display</h1>
        <Button onClick={handleWeb} className="btn" >
          Web App
        </Button>
        <Button onClick={handleiOS} className="btn" >
          Android App
        </Button>
        <Button onClick={handleAndroid} className="btn" >
          iOS App
        </Button>
      </div>
    </div>
    
    )
};

export default MainDisplay;