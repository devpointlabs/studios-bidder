import React, {useState, useEffect, useContext } from 'react';
import {Card} from 'semantic-ui-react';
import styled from "styled-components"
import { MathContext} from '../providers/MathProvider';

const FeatureCard = ({onClickFunction, isSelected, f}) => {
  const [isSelectedState, setIsSelectedState] = useState(false);

  const {handleAffectedByDesign} = useContext(MathContext);

  const handleSubmit = (catID, f,) => {
    f.affected_by_design && handleAffectedByDesign(f)
    onClickFunction(catID, f.id);
    setIsSelectedState(!isSelectedState)
  }

  useEffect(() => {
    setIsSelectedState(isSelected(f.id)) 
  },[isSelected])

  return (
    <Card raised style={{cursor:'pointer'}} 
          onClick={() => handleSubmit(f.category_id, f,)} 
          as={isSelectedState ? CardSelectBorder : CardUnselectBorder} 
          key={f.id} value={f.id}>
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
  border-color: rgb(77, 247, 74) !important;
`;

const CardUnselectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: rgb(9, 0, 41) !important;
`;


export default FeatureCard;