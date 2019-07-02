import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';

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
    <>
      <h1>{props.OS} Math</h1>
      <button onClick={() => handleSetPrice(props.OS)}>Click to show {props.OS} price</button >
      <h2>{props.OS} Price: ${renderPriceDisplay()}</h2>
    </>
  );
};


export default OSMath;