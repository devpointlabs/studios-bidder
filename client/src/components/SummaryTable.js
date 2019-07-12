import React,{ useState, useContext, useEffect } from 'react';
// import OSMath from './OSMath';
// import TotalMath from './TotalMath';
import { Segment, Header, Table} from 'semantic-ui-react';
import Colors from "../styles/Colors";
// import WhiteText from "../styles/WhiteText";
// import MainTitle from '../styles/MainTitle';
import styled from "styled-components";
import axios from 'axios';
import { MathContext,} from '../providers/MathProvider';
import { FeatureContext,} from '../providers/FeatureProvider';


const SummaryTable = ({ platform, estimateID }) => {
  // take pID pull categories with pID === c.platform_id
  // take those catIDs and do the same with features
  // const correctF = features.filter( f => catID === f.category_id);
  // const [platform, setPlatform] = useState('')
  const [featuresEstimates, setFeatureEstimates] = useState([]);
  const { selectedFs } = useContext(FeatureContext)

  // const {webPrice, iOSPrice, androidPrice, renderPrices, handleSetPrice} = useContext(MathContext);
  // const {selectedFeatures} = useContext(FeatureContext)

  // useEffect( () => {
  //   axios.get(`/api/features_estimates/${estimateID}`)
  //     .then( res  => 
  //       setFeatureEstimates(res.data));
    
  // },[]);
  
  
  // if (selectedFs > 0) {
    return (
      <Segment vertical as={NoLine}>
        <Header size="huge"> {platform} features</Header>
        <Table basic="very" striped> 
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Feature Name</Table.HeaderCell>
              <Table.HeaderCell> Developer Days </Table.HeaderCell>
              <Table.HeaderCell> Multiplier</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Segment>
      );
    // }else {
    //   return (
    //     <></>
    //   );
    // };
};

const NoLine = styled.div`
  border-bottom: 0px !important;
  border-bottom-width: 0px !important;
  border-color: white !important;
`

export default SummaryTable
