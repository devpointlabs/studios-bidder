import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';

const OSMath = (props) => {
  const math = useContext(MathContext);

  const renderPriceDisplay = () => {
    switch (props.OS){
      case 'Web': return math.webPrice
      case 'IOS': return math.iOSPrice
      case 'Android': return math.androidPrice
      default :
    }
  };

  return(
    <>
      <h1>OS Math</h1>
      <button onClick={() => math.handleSetPrice(props.OS)}>Click me</button >
      <h2>{renderPriceDisplay()}</h2>
    </>
  );
};


export default OSMath;