import React,{ useState, useContext, useEffect } from 'react';
import SummaryTable from './SummaryTable';
import OSMath from '../OSMath';
import TotalMath from '../TotalMath';
import {Image, Segment, Header, Table} from 'semantic-ui-react';
import Colors from "../../styles/Colors";
import WhiteText from "../../styles/WhiteText";
import MainTitle from '../../styles/MainTitle';
import styled from "styled-components";
import axios from 'axios';
import {MathContext,} from '../../providers/MathProvider';
import {FeatureContext,} from '../../providers/FeatureProvider';

const SummaryPage = ({eID, name, email}) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [eFeatures, setEFeatures] = useState([]);
  // const [eCatagories, setECatagories] = useState([]);
  // const [featuresEstimates, setFeatureEstimates] = useState([]);
  const [estimate, setEstimate] = useState([]);
  const { toPlatformItems, featuresFromEstimate, categoriesFromEstimate } = useContext(FeatureContext);
  const { exclusiveWebFeatures } = useContext(MathContext)

  // const ConvertState = () => {
  //   eCatagories.push(...categoriesFromEstimate);
  //   eFeatures.push(...featuresFromEstimate);
  // }

  useEffect( () => {
    // axios.get(`/api/features_estimates/${eID}`)
    //   .then( res  => //{debugger})
    //     setFeatureEstimates(res.data));
    axios.get(`/api/estimates/${eID}`)
      .then(res => //console.log(res.data)
        setEstimate(res.data)
        );
  },[eID]);

  return (
    <Segment.Group Vertical as={Colors} colored="white">
      <InternalPadding>
        <Segment vertical as={NoLine}>
          <Header as="h1" image>
            <Image
                src={require('../../images/dpl-logo.png')}
                size="medium"
            />
            <Header.Content>
              DevPoint Labs Estimate Summary
              <Header.Subheader>Client: {name}, {email}</Header.Subheader>
              <Header.Subheader>ESTIMATE ID - check that its rendering: ID# {eID}</Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
          <SummaryTable platform={'web'} platformByNum={'3'} estimateID={eID}/> 
          <SummaryTable platform={'ios'} platformByNum={'1'} estimateID={eID}/>
          <SummaryTable platform={'android'} platformByNum={'2'} estimateID={eID}/>
        <Segment vertical as={NoLine}>
          <Header size="huge" as={Colors} colored="light-grey" inverted textAlign="center">Estimate Totals</Header>
          <Table singleLine>
            <Table.Row> 
              <Table.Cell>Design</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.design_value}</Table.Cell>
            </Table.Row>
            <Table.Row> 
              <Table.Cell>Deployment</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.deployment_value}</Table.Cell>
            </Table.Row>
            <Table.Row> 
              <Table.Cell>Quality Assurance Testing</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.qaTesting_value}</Table.Cell>
            </Table.Row>
            <Table.Row> 
              <Table.Cell>Post Deployment Development</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.postDeploymentDev_value}</Table.Cell>
            </Table.Row>
            <Table.Row> 
              <Table.Cell>Non Dev Assumptions Total Days</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.nonDevTotal}</Table.Cell>
            </Table.Row>
            <Table.Row> 
              <Table.Cell>General Buffer Time</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.generalBuffer_value}</Table.Cell>
            </Table.Row>
            <Table.Row> 
              <Table.Cell>Total Days</Table.Cell>
              <Table.Cell textAlign='right'> Days {estimate.total}</Table.Cell>
            </Table.Row>
          </Table>
        </Segment>
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


 {/* features={eFeatures} catagories={eCatagories} */}