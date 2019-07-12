import React,{ useState, useContext, useEffect } from 'react';
import SummaryTable from './SummaryTable';
import OSMath from './OSMath';
import TotalMath from './TotalMath';
import {Image, Segment, Header, Table} from 'semantic-ui-react';
import Colors from "../styles/Colors";
import WhiteText from "../styles/WhiteText";
import MainTitle from '../styles/MainTitle';
import styled from "styled-components";
import axios from 'axios';
import {MathContext,} from '../providers/MathProvider';
import {FeatureContext,} from '../providers/FeatureProvider';

const SummaryPage = ({eID, name, email}) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');


  return (
    <Segment.Group Vertical as={Colors} colored="white">
      <InternalPadding>
        <Segment vertical as={NoLine}>
          <Header as="h1" image>
            <Image
                src={require('../images/dpl-logo.png')}
                size="medium"
            />
            <Header.Content>
              DevPoint Labs Estimate Summary
              <Header.Subheader>Client: {name}, {email}</Header.Subheader>
              <Header.Subheader>ESTIMATE ID CHECK RENDERING: ID# {eID}</Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        <SummaryTable platform={'web'} estimateID={eID}/>
        <SummaryTable platform={'ios'} estimateID={eID}/>
        <SummaryTable platform={'android'} estimateID={eID}/>
        {/* <Modal Button to close
        resetMath() */}
      </InternalPadding>
    </Segment.Group>
  )
};



const NoLine = styled.div`
  border-bottom: 0px !important;
  border-bottom-width: 0px !important;
  border-color: white !important;
`

const InternalPadding = styled.div`
  margin: 30px;
  background: white !important;
`



export default SummaryPage
