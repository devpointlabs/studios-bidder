import React, {useContext} from 'react';
import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';

const AndroidDisplay = (props) => {
  const {androidCategories, androidFeatures } = useContext(FeatureContext);

  return(
    <>
      <Segment as={NoLine}>
        <Container as={FeaturesContainer}>
          <Features 
            osFeatures={androidFeatures}
            osCategories={androidCategories}
            OS='android'
            setSelectedFeatures={props.setSelectedFeatures}
            selectedFeatures={props.selectedFeatures}
            setRadioButtons={props.setRadioButtons}
            radioButtons={props.radioButtons}
            />
        </Container>
      </Segment>
    </>
  );
};

const FeaturesContainer = styled.div`
  padding: 20px;
`;

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background-color: rgb(63, 39, 115) !important;
`


export default AndroidDisplay;