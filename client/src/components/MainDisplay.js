import React,{useState} from 'react';
import WebDisplay from './WebDisplay';
import IOSDisplay from './iOSDisplay';
import AndroidDisplay from './AndroidDisplay';
import { Container, Button, } from "semantic-ui-react";
import "./MainDisplay.css"
import axios from "axios";

const MainDisplay = () => {
  const [focus, setFocus] = useState("web")

  const [webSelections, setWebSelections] = useState({})
  const [iosSelections, setIOSSelections] = useState({})
  const [androidSelections, setAndroidSelections] = useState({})


  const handleWeb = () => {
    setFocus('web')
  };

  const handleiOS = () => {
    setFocus('ios')
  };

  const handleAndroid = () => {
    setFocus('android')
  };

  const displayForm = () => {
    switch(focus){
      case 'web': return <WebDisplay />;
      case 'ios': return <IOSDisplay />;
      case "android": return <AndroidDisplay />;
      default: return <h1>You broke the platform switcher</h1>
    }
  }

  return(
    <div>
      <h1 Align="center">Estimate Your App Cost</h1>
      <div className="container1">
        <h1> Main Display</h1>
        <Button onClick={handleWeb} className="btn" >
          Web App
        </Button>
        <Button onClick={handleiOS} className="btn" >
          iOS App
        </Button>
        <Button onClick={handleAndroid} className="btn" >
          Android App
        </Button>
      </div>
      {displayForm()}
    </div>
    
    )
};

export default MainDisplay;