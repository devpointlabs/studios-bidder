import React, {useContext} from "react";
import {MathContext} from '../providers/MathProvider';

const OSMath = (props) => {
  const math = useContext(MathContext);


  const handleDays = () => {
  const os = props.OS
  switch (os){
    case 'IOS':
      return math.IOS.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)
    case 'Android':
      return math.Android.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)      
    case 'Web':
      return math.Web.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)
    }
  };

  const handleMultiplier = (multiplier) => {
  };

  return(
    <>
      <h1>OS Math</h1>
      <h2>{handleDays()}</h2>
    </>
  );
};


export default OSMath;