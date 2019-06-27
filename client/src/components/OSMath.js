import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';

const OSMath = (props) => {
  const math = useContext(MathContext);


  const handleDayRate = () => {
  const os = props.OS
  switch (os){
    case 'Web':
      let total = math.Web.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)
      math.updateOsTotals(os, total)
      // return total
    case 'Android':
      return math.Android.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)      
    case 'IOS':
      return math.IOS.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)
    }
  };

  const handleMultiplier = (multiplier) => {
  };

  return(
    <>
      <h1>OS Math</h1>
      <button onClick={handleDayRate}>Click me</button >
      {/* <h2>{math.state.webPrice}</h2> */}
    </>
  );
};


export default OSMath;