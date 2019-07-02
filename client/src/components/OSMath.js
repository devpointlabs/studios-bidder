import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';
import {Container, Button, Header,} from 'semantic-ui-react';
import HeaderText from "../styles/HeaderText";
import Colors from "../styles/Colors";
import MainTitle from '../styles/MainTitle'

const OSMath = (props) => {
  const {webPrice, iOSPrice, androidPrice, handleSetPrice} = useContext(MathContext);

  const renderPriceDisplay = () => {
    switch (props.OS){
      case 'web': return webPrice
      case 'ios': return iOSPrice
      case 'android': return androidPrice
      default :
    }
  };

  return(
    <Container textAlign="center" as={Colors} colored="white">
      <Header align="center" as={MainTitle} fSize="large">{props.OS} Math</Header>
      <Button as={Colors} inverted colored="light" onClick={() => handleSetPrice(props.OS)}>Click to show {props.OS} price</Button >
      <Header align="center" as={MainTitle} fSize="small">{props.OS} Price: ${renderPriceDisplay()}</Header>
    </Container>
  );
};


export default OSMath;