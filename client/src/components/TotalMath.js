import React from "react";
import { MathProvider, MathConsumer } from "../providers/MathProvider";

class TotalMath extends React.Component {
  featureTotal = () => {
    const {math:{webPrice, iOSPrice, androidPrice}} = this.props
    var total = 0
    return(
      webPrice + iOSPrice + androidPrice
      
      // .map((element) => 
      //   total += parseInt(element.base_days) * parseInt(element.multiplier)
      //   )
      )
  }
  
  render() {
    return(
      <div>
        {this.featureTotal()}
      </div>
    );
  };
};

export default class ConnectedMath extends React.Component {
  render() {
    return(
      <MathConsumer>
        {mathObject => 
          // mathObject.MathProvider.state
          <TotalMath {...this.props} math={mathObject} />

        }
      </MathConsumer>
    );
  };
};



// take the totals and display them under each Web, Android, iOS displays.