import React, {useContext, useEffect} from "react";
import {MathContext} from '../providers/MathProvider';
import {Header,} from 'semantic-ui-react';
import WhiteText from '../styles/WhiteText'

const OSMath = (props) => {
  const {webPrice, iOSPrice, androidPrice, renderPrices, handleSetPrice} = useContext(MathContext);

  useEffect( () => {
    handleSetPrice(props.OS)
  },[renderPrices])

  const renderPriceDisplay = () => {
    switch (props.OS){
      case 'web': return webPrice
      case 'ios': return iOSPrice
      case 'android': return androidPrice
      default :
    }
  };

  return(
    <>
      <Header align="center" as={WhiteText} fSize="medium">{props.OS} Price: ${renderPriceDisplay()}</Header>
    </>
  );
};


export default OSMath;