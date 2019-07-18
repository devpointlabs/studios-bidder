import React, {useContext} from 'react';
import Features from './Features';
import {Container, Segment, } from 'semantic-ui-react';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';

const WebDisplay = (props) => {
  const {webCategories, webFeatures} = useContext(FeatureContext);
  
  return (
  <>
    <Segment as={NoLine}>
      <Container as={FeaturesContainer}>
        <Features
          osFeatures={webFeatures}
          osCategories={webCategories}
          OS='web'
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
  background-color: rgb(129, 104, 177) !important;
`

export default WebDisplay;