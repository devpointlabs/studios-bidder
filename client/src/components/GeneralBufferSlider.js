import React, {useState, useEffect} from 'react';
import {Header, Divider} from 'semantic-ui-react';
import SliderBar from './SliderBar';
import styled from 'styled-components';
import {Table, Row, Cell, SliderCell} from '../styles/SliderTable';
import DarkText from '../styles/DarkText'



const GeneralBufferSlider = (props) => {
  const [generalBufferMultiplier, setGeneralBufferMultiplier] = useState(.05);
  const [generalBufferValue, setGeneralBufferValue] = useState(0);
  const [nonDevTotal, setNonDevTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0);


  useEffect( () => {
    let gBV = (parseFloat(props.nonDevTotal) + props.coreDevTime) * generalBufferMultiplier;
    setSubTotal(parseFloat(props.nonDevTotal) + props.coreDevTime);
    setGeneralBufferValue(gBV.toFixed(1));
    setNonDevTotal(props.nonDevTotal);
    setTotal(subTotal + gBV);
  },[props.nonDevTotal, props.coreDevTime]);
  
  useEffect( () => {
    props.getGeneralBufferData(generalBufferMultiplier)
  },[generalBufferMultiplier])


  const handleChange = (nonDevTime, multiplier, name) => {
    setGeneralBufferMultiplier(multiplier/100);
    setGeneralBufferValue(nonDevTime.toFixed(1));
    setTotal(parseFloat(props.nonDevTotal) + props.coreDevTime + parseFloat(generalBufferValue));
  };

    return(
    <>
      <SubTotal>
        <Header as={DarkText}style={{fontSize: '2.2em'}} >Non Dev Assumptions Total Days: {nonDevTotal}</Header >
      </SubTotal>
      <Divider />
      <div style={{backgroundColor: '#CCCACF'}}>
        <Table>
          <Row>
            <Cell position='left'><h3>General Buffer Time</h3></Cell>
            <SliderCell> 
              <SliderBar 
                name='generalBuffer'
                defaultValue={generalBufferMultiplier}
                coreDevTime={subTotal}
                handleChange={handleChange}
              />
            </SliderCell>
          <Cell position='right'>
              <h3>Days: {generalBufferValue}</h3>
          </Cell>
          </Row>
        </Table>
      </div>
        <div style={{width: '100%', textAlign: 'center'}}>
          <h2 style={{fontSize: '3em'}}>Total Days: {total.toFixed(1)}</h2>
        </div>
    </>
  );
};

const SubTotal = styled.div`
    padding: 15px;
    font-size: 3vw;
    /* border: 1px solid #5E4296; */
    border-radius: 4px;
    width: 50%;
    justify-content: space-between;
    text-align: center;
    margin: 0 auto;
`;

export default GeneralBufferSlider;