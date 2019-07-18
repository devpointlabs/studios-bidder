import React, {useState, useEffect } from 'react';
import { Segment, } from 'semantic-ui-react';
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

      <Image 
      as={isSelectedState ? CardSelectBorder : CardUnselectBorder} 
      onClick={() => handleSubmit(f.category_id, f.id)} 
      data-tooltip={f.description} data-position="bottom center"
      />
      

    </Card>


    // <card 
          
    //   <Card.Content content={f.id} className={f.id} value={f.id}>
    //     <Card.Header>{f.name}</Card.Header>
    //       <Card.Meta>
    //       Base Days: {f.base_days}
    //       </Card.Meta>
    //     {/* <Card.Description>{f.description}</Card.Description> */}
    //     <Card.Meta as={StyledHover} class="ui button" data-inverted="" data-tooltip={f.description} data-position="bottom center">
    //       <StyledHover className="iconImage">
    //       <Image src={'https://image.shutterstock.com/image-photo/valencia-spain-march-05-2017-260nw-593204357.jpg'}
    //         size="small"
    //        />
    //       </StyledHover>
    //     </Card.Meta>
    //   </Card.Content>
    // </card>
    
  )
};


const CardSelectBorder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;  border: 5px solid !important; 
  border-color: rgb(76, 175, 80) !important;
  
`;

const CardUnselectBorder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;  border: 5px solid !important; 
  border-color: #FFFFFF !important;

`;

const Card = styled.div`
  
  
  width:  15vw;
  height: 15vw;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  `;




const Image = styled.div`
  
  background: url(${picture});
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: 100px 100px;
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
  
  `;



export default FeatureCard;