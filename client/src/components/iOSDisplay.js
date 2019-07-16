import React, {useContext} from 'react';
import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';

const IOSDisplay = (props) => {
  const {iosCategories, iosFeatures} = useContext(FeatureContext);
  
  return (
  <>
    <Segment as={NoLine}>
      <Container as={FeaturesContainer}>
        <Features
          osFeatures={iosFeatures}
          osCategories={iosCategories}
          OS='ios'
          selectedFeatures={props.selectedFeatures}
          setSelectedFeatures={props.setSelectedFeatures}
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
  background-color: rgb(94, 66, 150) !important;
`


export default IOSDisplay;