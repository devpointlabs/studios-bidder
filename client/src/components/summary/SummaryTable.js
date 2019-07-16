import React,{ useState, useContext, useEffect } from 'react';
// import OSMath from './OSMath';
// import TotalMath from './TotalMath';
import { Segment, Header, Table} from 'semantic-ui-react';
import Colors from "../../styles/Colors";
// import WhiteText from "../styles/WhiteText";
// import MainTitle from '../styles/MainTitle';
import styled from "styled-components";
import axios from 'axios';
import { MathContext,} from '../../providers/MathProvider';
import { FeatureContext,} from '../../providers/FeatureProvider';


const SummaryTable = ({ platform, platformByNum, estimateID, features, catagories }) => {
  // take pID pull categories with pID === c.platform_id
  // take those catIDs and do the same with features
  // const correctF = features.filter( f => catID === f.category_id);
  // const [platformCategories, setPlatformCategories] = useState('');
  // const [platformFeatures, setPlatformFeatures] = useState('');
  const [catagoriesEstimates, setCatagoriesEstimates] = useState([]);
  const [featuresEstimates, setFeaturesEstimates] = useState([]);
  // const [f, setF] = useState([])

  const { toPlatformItems, platformFeatures, platformCategories, featuresFromEstimate, categoriesFromEstimate } = useContext(FeatureContext);

  useEffect( () => {

    setCatagoriesEstimates(categoriesFromEstimate)
    setFeaturesEstimates(featuresFromEstimate)
  }, [categoriesFromEstimate])
  // { platform, platformByNum, estimateID }

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
    // const pCatagories = catagoriesEstimates.filter( f => platformByNum == f.platform_id);
    const pCatagories = [ ...new Set(catagoriesEstimates.filter( f => platformByNum == f.platform_id)) ]
    // const pFeatures = featuresEstimates.filter( f => pCatagories.id === f.catagory_id)

    // console.log(pCatagories)
    // if (category.platform_id == platformByNum) {

      return (
        pCatagories.map( c => {
          return (
            <Segment vertical as={NoLine}>
              <Table singleLine fixed>
                <Table.Header>
                  <Table.HeaderCell colSpan='4' textAlign="center"> {c.name}</Table.HeaderCell>
                  {/* <Table.HeaderCell colSpan='3'> */}
                  <Table.Row>
                    <Table.HeaderCell> Feature Name</Table.HeaderCell>
                    <Table.HeaderCell> </Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'> Developer Days </Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'> Multiplier</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {featuresEstimates.map( f => {
                  if (f.category_id === c.id) {
                    return (
                    <>
                      <Table.Row>
                        <Table.Cell>{f.name}</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell textAlign='right'>{f.base_days}</Table.Cell>
                        <Table.Cell textAlign='right'>{f.multiplier}</Table.Cell>
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

const CategoryHeader = styled.div`
   text-decoration: underline !important;
   color: rgb(94, 66, 150) !important
`

export default SummaryTable;
