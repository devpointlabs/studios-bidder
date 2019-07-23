import React,{ useState, useContext, useEffect } from 'react';
import { Segment, Header, Table} from 'semantic-ui-react';
import Colors from "../../styles/Colors";
import styled from "styled-components";
import { FeatureContext,} from '../../providers/FeatureProvider';
import { HistoryContext,} from '../../providers/HistoryProvider';

const SummaryTable = ({ platform, platformByNum, estimateID, features, catagories, fromHistory}) => {
  const [catagoriesEstimates, setCatagoriesEstimates] = useState([]);
  const [featuresEstimates, setFeaturesEstimates] = useState([]);
  const { categoriesFromEstimate, setEstimateLoaded, featuresFromEstimate } = useContext(FeatureContext);
  const { handleHistoryIDs, handleEstimate, categoriesFromHistory, featuresFromHistory } = useContext(HistoryContext);


  useEffect( () => {
    // if (fromHistory === true) {
    //   handleEstimate(estimateID)
    //   setCatagoriesEstimates(categoriesFromHistory)
    //   setFeaturesEstimates(featuresFromHistory)
    // }
    // if (fromHistory === false) {
      catagoriesAxios()
    // setCatagoriesEstimates(categoriesFromEstimate)
    // setFeaturesEstimates(featuresFromEstimate)
    }, [])
  
  const catagoriesAxios = () => {
    featuresFromEstimate.map(fe => console.log(fe.category_id))
    setEstimateLoaded()
  }

  const platformRendering = (platformByNum) => {
    if ((catagoriesEstimates.filter( f => platformByNum == f.platform_id)) != 0) {
      return (
        <>
          <Header size="huge" as={Colors} colored="light" inverted textAlign="center"> {platform} features</Header>
          {exclusiveRendering(platformByNum)}
        </>
      )
    }
  }

  const exclusiveRendering = (platformByNum) => {
    const pCatagories = [ ...new Set(catagoriesEstimates.filter( f => platformByNum == f.platform_id)) ]

      return (
        pCatagories.map( c => {
          return (
            <Segment vertical as={NoLine}>
              <Table singleLine fixed stackable>
                <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan='4' textAlign="center"> {c.name}</Table.HeaderCell>
                    </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'> Feature Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right' colSpan='2'> Developer Days </Table.HeaderCell>
                    {/* <Table.HeaderCell textAlign='right'> Multiplier</Table.HeaderCell> */}
                  </Table.Row>
                </Table.Header>
                {featuresEstimates.map( f => {
                  if (f.category_id === c.id) {
                    return (
                    <>
                      <Table.Row>
                        <Table.Cell colSpan='2'>{f.name}</Table.Cell>
                        <Table.Cell textAlign='right' colSpan='2'>{f.base_days}</Table.Cell>
                        {/* <Table.Cell textAlign='right'>{f.multiplier}</Table.Cell> */}
                      </Table.Row>
                    </>
                    )
                  }
                })}
              </Table>
            </Segment>
          )
        })
      )
    }

  return (
    <Segment vertical as={NoLine}>
      {platformRendering(platformByNum)}
    </Segment>
  );;

};

const NoLine = styled.div`
  border-bottom: 0px !important;
  border-bottom-width: 0px !important;
  border-color: white !important;
`



export default SummaryTable;
