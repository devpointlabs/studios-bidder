import React,{useState} from 'react';
import WebDisplay from './WebDisplay';
import IOSDisplay from './iOSDisplay';
import AndroidDisplay from './AndroidDisplay';
import styled, { keyframes } from "styled-components";
import HeaderText from "../styles/HeaderText";
import MainTitle from '../styles/MainTitle'
import {Container, Button, Segment, Header} from 'semantic-ui-react';
import Colors from "../styles/Colors";
// import axios from "axios";

const MainDisplay = () => {
  const [focus, setFocus] = useState("web")

  // const [webSelections, setWebSelections] = useState({})
  // const [iosSelections, setIOSSelections] = useState({})
  // const [androidSelections, setAndroidSelections] = useState({})


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
    <Segment.Group Vertical>
      <Header align="center" as={MainTitle} fSize="large">Estimate Your App Cost</Header>
        <Header align="center" as={MainTitle} fSize="small"> Main Display</Header>
        <Segment.Group horizontal>
          <Segment onClick={handleWeb} as={Colors} colored="light">
              <br/>
              <Header align="center" as={HeaderText} fSize="Medium">Web App</Header>
              <br/>
          </Segment>
          <Segment onClick={handleiOS} as={Colors} colored="medium-dark">
            <br/>
            <Header align="center" as={HeaderText} fSize="Medium">iOS App</Header>
          </Segment>
          <Segment onClick={handleAndroid} as={Colors} colored="dark">
            <br/> 
            <Header align="center" as={HeaderText} fSize="Medium">Android App</Header>
          </Segment>
        </Segment.Group>
          {displayForm()}
    </Segment.Group>
    
    )
};

const AppContainer = styled.div`
  background: #634a99;
`;

const StyledTrio = styled.div`
  color: #312d2d;
  padding: 15px 25px;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  width: 200px; 
  
  &:hover {
    background: #606060;
    transition: background 0.2s ease;
  }
`;

export default MainDisplay;