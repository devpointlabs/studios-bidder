import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Grid, Radio, Card, Input, Checkbox, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";
import styled from "styled-components"
import "./Features.less"

const FeatureCard = ({onClickFunction, isSelected, f}) => {
  const [isSelectedState, setIsSelectedState] = useState(false);

  const handleSubmit = (catID, fID) => {
    onClickFunction(catID, fID);
    setIsSelectedState(!isSelectedState)
  }

  useEffect(() => {
    setIsSelectedState(isSelected(f.id)) 
  }, [isSelected])

  return (
    <Card onClick={() => handleSubmit(f.category_id, f.id)} as={isSelectedState ? CardSelectBorder : CardUnselectBorder} key={f.id} value={f.id}>
      <Card.Content content={f.id} className={f.id} value={f.id}>
        <Card.Header>{f.name}</Card.Header>
        <Card.Description>{f.description}</Card.Description>
        <Card.Meta>Base Days: {f.base_days}</Card.Meta>
      </Card.Content>
    </Card>
  )

};

const CardSelectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: rgb(111, 242, 175) !important;
`;

const CardUnselectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: rgb(9, 0, 41) !important;
`;


export default FeatureCard;