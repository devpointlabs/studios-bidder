import React from "react";
import { MathProvider, MathConsumer } from "../providers/MathProvider";
import { Container, Header,} from 'semantic-ui-react';
import Colors from "../styles/Colors";
import MainTitle from '../styles/MainTitle'

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
      <Container textAlign="center" as={Colors} colored="white">
        <Header align="center" as={MainTitle} fSize="small">Total Price: ${this.featureTotal()}</Header>
      </Container>
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