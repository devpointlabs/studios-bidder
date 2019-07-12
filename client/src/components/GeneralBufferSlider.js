import React, {useState, useEffect} from 'react';
import {Grid, Divider } from 'semantic-ui-react';
import SliderBar from './SliderBar';
import styled from 'styled-components';

const GeneralBufferSlider = (props) => {
  const [generalBufferMultiplier, setGeneralBufferMultiplier] = useState(.05);
  const [generalBufferValue, setGeneralBufferValue] = useState(0);
  const [total, setTotal] = useState(0);


  useEffect( () => {
    let gBV = props.nonDevTotal * generalBufferMultiplier
    let subTotal = parseFloat(props.nonDevTotal) + props.coreDevTime
    setGeneralBufferValue(gBV.toFixed(1))
    setTotal(subTotal + gBV)

  },[props.nonDevTotal, props.coreDevTime]);


  const handleChange = (nonDevTime, multiplier, name) => {
    setGeneralBufferMultiplier(multiplier/100);
    setGeneralBufferValue(nonDevTime.toFixed(1));
    updateFinalTotal(generalBufferValue)
  };

  const updateFinalTotal = (generalBufferValue) => {
    let subTotal = parseFloat(props.nonDevTotal) + props.coreDevTime
    setTotal(subTotal + parseFloat(generalBufferValue))
  }

    return(
      <>
      <Grid columns='one' stackable divided relaxed style={{padding: '20px'}}>
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
            coreDevTime={props.nonDevTotal}
            handleChange={handleChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider style={{margin: '0px 30px 0px 30px'}}/>
      <div style={{width: '100%', textAlign: 'center'}}>
        {total > 0 &&
        <h2>Total Total Days: {total.toFixed(1)}</h2>
        }
      </div>
      </>
    )
};

const SliderInfo = styled.div`
  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  margin-top: -30px !important;
`
export default GeneralBufferSlider;