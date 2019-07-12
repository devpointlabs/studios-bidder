import React, {useState, useEffect} from 'react';
import {Grid, Divider } from 'semantic-ui-react';
import SliderBar from './SliderBar';
import styled from 'styled-components';

const GeneralBufferSlider = (props) => {
  const [generalBufferMultiplier, setGeneralBufferMultiplier] = useState(.05);
  const [generalBufferValue, setGeneralBufferValue] = useState(0);
  const [nonDevTotal, setNonDevTotal] = useState(0)
  const [total, setTotal] = useState(0);


  useEffect( () => {
    let gBV = props.nonDevTotal() * generalBufferMultiplier;
    let subTotal = parseFloat(props.nonDevTotal()) + props.coreDevTime;
    setGeneralBufferValue(gBV.toFixed(1));
    setNonDevTotal(props.nonDevTotal());
    setTotal(subTotal + gBV);
  },[props.nonDevTotal(), props.coreDevTime]);


  const handleChange = (nonDevTime, multiplier, name) => {
    setGeneralBufferMultiplier(multiplier/100);
    setGeneralBufferValue(nonDevTime.toFixed(1));
    setTotal(parseFloat(props.nonDevTotal()) + props.coreDevTime + parseFloat(generalBufferValue));
  };

    return(
    <>
      <div style={{width: '100%', textAlign: 'center'}}>
        <h2>Non Dev Assumptions Total Days: {nonDevTotal}</h2>
      </div>
      <Divider style={{margin: '0px 30px 0px 30px'}}/>
      <Grid columns='one' stackable divided relaxed style={{padding: '20px 200px 20px 200px'}}>
        <Grid.Row>
          <Grid.Column>
          <SliderInfo>
            <h4>General Buffer Time</h4>
            <h4>Days: {generalBufferValue}</h4>
          </SliderInfo>
          <br />
          <SliderBar 
            name='generalBuffer'
            defaultValue={generalBufferMultiplier}
            coreDevTime={props.nonDevTotal()}
            handleChange={handleChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider style={{margin: '0px 30px 0px 30px'}}/>
      <div style={{width: '100%', textAlign: 'center'}}>
        <h2 style={{fontSize: '3em'}}>Total Days: {total.toFixed(1)}</h2>
      </div>
    </>
  );
};

const SliderInfo = styled.div`
  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  margin-top: -30px !important;
`
export default GeneralBufferSlider;