import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';

const OSMath = (props) => {
  const {webPrice, iOSPrice, androidPrice, handleSetPrice} = useContext(MathContext);

  const renderPriceDisplay = () => {
    switch (props.OS){
      case 'web': return webPrice
      case 'iOS': return iOSPrice
      case 'android': return androidPrice
      default :
    }
  };

  return(
    <>
      <h1>{props.OS} Math</h1>
      <button onClick={() => handleSetPrice(props.OS)}>Click me</button >
      <h2>{renderPriceDisplay()}</h2>
    </>
  );
};


export default OSMath;