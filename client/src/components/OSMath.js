import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';
import {Container, Button, Header,} from 'semantic-ui-react';
import Colors from "../styles/Colors";
import DarkText from '../styles/DarkText'

const OSMath = (props) => {
  const {webPrice, iOSPrice, androidPrice,} = useContext(MathContext);

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
      <Header align="center" as={DarkText} fSize="large">{props.OS} Math</Header>
      <Header align="center" as={DarkText} fSize="small">{props.OS} Price: ${renderPriceDisplay()}</Header>
    </Container>
  );
};


export default OSMath;