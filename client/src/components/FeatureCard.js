import React, {useState, useEffect } from 'react';
import {Card, Image, Segment, } from 'semantic-ui-react';
import styled from "styled-components"
import "./icons.css";

const FeatureCard = ({onClickFunction, isSelected, f}) => {
  const [isSelectedState, setIsSelectedState] = useState(false);

  const handleSubmit = (catID, fID) => {
    onClickFunction(catID, fID);
    setIsSelectedState(!isSelectedState)
  }

  useEffect(() => {
    setIsSelectedState(isSelected(f.id)) 
  },[isSelected])

  return (
    <Card 
          onClick={() => handleSubmit(f.category_id, f.id)} 
          as={isSelectedState ? CardSelectBorder : CardUnselectBorder} 
          key={f.id} value={f.id}
          >
      <Card.Content content={f.id} className={f.id} value={f.id}>
        <Card.Header>{f.name}</Card.Header>
          <Card.Meta>
          Base Days: {f.base_days}
          </Card.Meta>
        {/* <Card.Description>{f.description}</Card.Description> */}
        <Card.Meta as={StyledHover} class="ui button" data-inverted="" data-tooltip={f.description} data-position="bottom center">
          <Image className="iconImage"
          src={require('../images/dpl-logo.png')}
          size="small"
          />
        </Card.Meta>
      </Card.Content>
    </Card>
    
  )

};

const StyledHover = styled.div`
  /* display: flex;
  background: #312d2d;
  color: white;
  padding: 15px 25px;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  width: 150px; */
  margin-left: auto;
  margin-right: auto;
  width: 50%; 
  background: #dedede;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background: #787878;
    transition: background 0.2s ease;
  }
`;

const CardSelectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: rgb(76, 175, 80) !important;
  
`;

const CardUnselectBorder = styled.div`
  border-radius: 4px !important;
  border: 5px solid !important; 
  border-color: #FFFFFF !important;

`;


export default FeatureCard;