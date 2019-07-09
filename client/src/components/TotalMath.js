import React from "react";
import { MathConsumer } from "../providers/MathProvider";
import { Header } from 'semantic-ui-react';
import DarkText from '../styles/DarkText'
import MainTitle from "../styles/MainTitle";

class TotalMath extends React.Component {
  featureTotal = () => {
    const {math:{webPrice, iOSPrice, androidPrice}} = this.props
    return(
      webPrice + iOSPrice + androidPrice
      
      // .map((element) => 
      //   total += parseInt(element.base_days) * parseInt(element.multiplier)
      //   )
      )
  }
  
  render() {
    return(
      <>
        <Header align="center" as={DarkText} fSize="medium">Total Price: ${this.featureTotal()}</Header>
        <Header align="center" as={MainTitle} colored="light-grey" padding="tiny" fSize="tiny">
          Combined price of Web, iOs, and Android.
        </Header>
        <Header align="center" as={MainTitle} colored="light-grey"  fSize="micro">
        "Please note, all cost estimates are intended to be indicative of development costs and timescales only and are exclusive of all hosting costs, paid services or purchased assets of any kind. All prices are in USD and inclusive of sales tax."
        </Header>
      </>
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