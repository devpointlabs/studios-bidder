import React, { Component, useState, useContext, useEffect, useCallback } from 'react';
import SummaryTable from './SummaryTable';
import {Image, Segment, Header, Table, Loader, Dimmer} from 'semantic-ui-react';
import Colors from "../../styles/Colors";
import styled from "styled-components";
import axios from 'axios';
import { HistoryContext} from '../../providers/HistoryProvider';


const HistorySummary = ({ estimate, name, email, eID, fromHistory }) => {
  const [loaded, setLoaded ] = useState(false)
  const { categoriesLoaded, resetCategoriesFromHistory, resetFeaturesFromHistory, resetFeatureIDsFromHistory, featureIDsFromHistory, featuresLoaded, handleHistoryIDs, handleEstimate, categoriesFromHistory, featuresFromHistory } = useContext(HistoryContext);

 
  useEffect( () => {
      // handleHistoryIDs()
      // handleEstimate(eID)
      console.log(eID)
    axios.get(`/api/features_by_id/${featureIDsFromHistory}`)
      .then(res => {resetFeaturesFromHistory()
        featuresFromHistory.push(...res.data)})
      // featuresFromHistory = [...new Set(res.data)])
      // .then(this.featuresLoaded())
      // console.log(featuresFromHistory)
    axios.get(`/api/categories_by_feature_id/${featureIDsFromHistory}`)
      .then(res =>  {resetCategoriesFromHistory()
        categoriesFromHistory.push(...res.data) 
      // {categoriesFromHistory = [...new Set(res.data)] 
      // handleEstimate(eID)
        // categoriesLoaded() 
        // resetFeatureIDsFromHistory()
        setLoaded(true)
      })

    // summaryAxios()
    
  }, [])

  // const summaryAxios = () => {
  //   handleEstimate(eID)
  //   axios.get(`/api/features_by_id/${featureIDsFromHistory}`)
  //     .then(res => featuresFromHistory.push(...res.data))
  //     // .then(this.featuresLoaded())
  //     // console.log(featuresFromHistory)
  //   axios.get(`/api/categories_by_feature_id/${featureIDsFromHistory}`)
  //     .then(res => {categoriesFromHistory.push(...res.data) 
  //       categoriesLoaded() })
  //   // handleHistoryIDs()
  // }

  const loadedRendering = () => {

    // if (loaded === true ) {
      return (
        <Segment.Group Vertical as={NoLine} color="white">
          <InternalPadding>
            <Segment vertical as={NoLine}>
              <Header as="h1" image>
                <Image
                    src={require('../../images/dpl-logo.png')}
                    size="medium"
                />
                <Header.Content>
                  DevPoint Labs Estimate Summary
                  <Header.Subheader> Client:  {name},  {email}</Header.Subheader>
                  <Header.Subheader>ESTIMATE ID - check that its rendering: ID# {eID}</Header.Subheader>
                </Header.Content>
              </Header>
            </Segment>
            <SummaryTable platform={'web'} platformByNum={'3'} estimateID={eID} fromHistory={fromHistory}/> 
            <SummaryTable platform={'ios'} platformByNum={'1'} estimateID={eID}  fromHistory={fromHistory}/>
            <SummaryTable platform={'android'} platformByNum={'2'} estimateID={eID}  fromHistory={fromHistory}/>
            <Segment vertical as={NoLine}>
              <Header size="huge" as={Colors} colored="medium-grey" inverted textAlign="center">Estimate Totals</Header>
              <Table singleLine>
                <Table.Row style={{fontWeight: '900', backgroundColor: '#CCCACF'}}> 
                  <Table.Cell>Developer Days</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.coreDevTime} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Design</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.design_value} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Deployment</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.deployment_value} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Quality Assurance Testing</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.qaTesting_value} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Post Deployment Development</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.postDeploymentDev_value} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Project Management</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.projectManagement_value} Days</Table.Cell>
                </Table.Row>
                <Table.Row style={{fontWeight: '900', backgroundColor: '#CCCACF'}}> 
                  <Table.Cell>Non Developer Days</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.nonDevTotal} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>General Buffer Time</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.generalBuffer_value} Days</Table.Cell>
                </Table.Row>
                <Table.Row style={{fontWeight: '900', backgroundColor: '#CCCACF'}}> 
                  <Table.Cell>Total Days</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.total} Days</Table.Cell>
                </Table.Row>
              </Table>
            </Segment>
          </InternalPadding>
        </Segment.Group>
    // ) } else {
    //   return (
    //     <Loader>
    //       Loading estimate Page. Please Wait...
    //     </Loader>
      )
    // }
  }

  return (
    <>
      {loadedRendering()}
    </>
  );
}


const NoLine = styled.div`
  border-bottom: 0px !important;
  border-bottom-width: 0px !important;
  border-color: white !important;
  border-top: 0px !important;
  border-top-width: 0px !important;
`

const InternalPadding = styled.div`
  margin: 30px;
  background: white !important;
`
export default HistorySummary