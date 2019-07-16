import React, {useState, useEffect} from 'react';
import {Grid, Divider, Header } from 'semantic-ui-react';
import DarkText from '../../styles/DarkText';
import MainTitle from '../../styles/MainTitle';
import SliderBar from './SliderBar';
import styled from 'styled-components';

const GeneralBufferSlider = (props) => {
  const [generalBufferMultiplier, setGeneralBufferMultiplier] = useState(.05);
  const [generalBufferValue, setGeneralBufferValue] = useState(0);
  const [nonDevTotal, setNonDevTotal] = useState(0)
  const [total, setTotal] = useState(0);


  useEffect( () => {
    let gBV = Math.round((props.nonDevTotal() * generalBufferMultiplier) * 1e1) / 1e1;
    let subTotal = props.nonDevTotal() + props.coreDevTime;
    setGeneralBufferValue(gBV);
    setNonDevTotal(props.nonDevTotal());
    setTotal(Math.round((subTotal + gBV) * 1e1) / 1e1);
  },[props.nonDevTotal(), props.coreDevTime]);
  
  useEffect( () => {
    props.getGeneralBufferData(total, {generalBuffer: {multiplier: generalBufferMultiplier, value: generalBufferValue}})
  },[generalBufferMultiplier, generalBufferValue])


  const handleChange = (nonDevTime, multiplier, name) => {
    setGeneralBufferMultiplier(multiplier/100);
    setGeneralBufferValue(nonDevTime);
    setTotal(props.nonDevTotal() + props.coreDevTime + generalBufferValue);
  };

    return(
    <>
    <Divider/>
      <div style={{width: '100%', textAlign: 'center', padding: '2em'}}>
        <Header as={DarkText} fSize='medium'>Non Dev Assumptions Total Days: {nonDevTotal}</Header>
      </div>
    <Divider />
      <div style={{backgroundColor: '#CCCACF'}}>
      <Divider/>
      <Grid columns='one' stackable divided relaxed style={{padding: '20px 50px 20px 50px'}}>
        <Grid.Row>
          <Grid.Column centered>
          <SliderInfo>
            <Header as={DarkText} fSize='small'><span style={{fontSize: '0.6em'}}>**</span>General Buffer Time</Header>
            <Header as={DarkText} fSize='small'>Days: {generalBufferValue}</Header>
          </SliderInfo>
          <br />
          <SliderBar 
            name='generalBuffer'
            defaultValue={generalBufferMultiplier}
            coreDevTime={props.nonDevTotal()}
            handleChange={handleChange}
            />
          <Header as={MainTitle} colored="light-grey" padding="tiny" fSize="tiny">
            **Percentage of non dev asumptions total days
          </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
      <Divider/>
      <div style={{width: '100%', textAlign: 'center'}}>
        <h2 style={{fontSize: '3em', marginTop: '3vh'}}>Total Days: {total.toFixed(1)}</h2>
      </div>
      <Divider/>
    </>
  );
};

const SliderInfo = styled.div`
  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  /* margin-top: -30px !important; */
`
export default GeneralBufferSlider;