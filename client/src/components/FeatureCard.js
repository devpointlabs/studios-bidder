import React, {useState, useEffect } from 'react';
import { Popup, } from 'semantic-ui-react';
import styled from "styled-components"
import "./icons.css";
import picture from "./image.png"

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
      key={f.id} value={f.id}
    >
    
      <h3>{f.name}</h3>
      <p>Base Days: {f.base_days}</p>
      <Popup 
        trigger={<Image 
         
                    style={{backgroundImage: `url(${f.image_url})`}}
                    as={isSelectedState ? CardSelectBorder : CardUnselectBorder} 
                    onClick={() => handleSubmit(f.category_id, f.id)} />}
        content={f.description}
        position='bottom center'
      />
    </Card>
  )
};


const CardSelectBorder = styled.div`
  width: 8.33em;
  height: 8.33em;
  border-radius: 50%;  border: 5px solid !important; 
  border-color: rgb(76, 175, 80) !important;
`;

const CardUnselectBorder = styled.div`
  width: 8.33em;
  height: 8.33em;
  border-radius: 50%;  border: 5px solid !important; 
  border-color: #FFFFFF !important;
`;

const Card = styled.div`
  width:  15em;
  height: 15em;
  display: flex;
  justify-content: space-beween;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    width: 10em;
    height: 10em;
  }
  `;
const Image = styled.div`
  
  /* background: url(${picture}); */
  width: 13em;
  height: 13em;
  border-radius: 50%;
  background-size: 13em;
  background-position: center;
  background-repeat: no-repeat;
  border: 3px solid #f2f2f2;
  cursor: pointer;
  &:hover {
    border-color: 3px rgb(76, 175, 80);
    color:#000;
    opacity:0.7;
    transistion: background 0.3s ease;
  }
  @media (max-width: 500px) {
    width: 8.5em;
    height: 8.5em;
    background-size: 10em;
  }
  
  `;



export default FeatureCard;