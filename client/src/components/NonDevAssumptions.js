import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import DarkText from '../styles/DarkText';
import MainTitle from '../styles/MainTitle';
import SliderBar from './SliderBar';
import styled from 'styled-components';
import GeneralBufferSlider from './GeneralBufferSlider';

class NonDevAssumptions extends React.Component {
  state = {
    design: {multiplier: .10, value: Math.round((this.props.coreDevTime * .1) * 1e1) / 1e1},
    qaTesting: {multiplier: .10, value: Math.round((this.props.coreDevTime * .1) * 1e1) / 1e1},
    deployment: {multiplier: .03, value: Math.round((this.props.coreDevTime * .03) * 1e1) / 1e1},
    postDeploymentDev: {multiplier: .15, value: Math.round((this.props.coreDevTime * .15) * 1e1) / 1e1},
    projectManagement: {multiplier: .10, value: Math.round((this.props.coreDevTime * .1) * 1e1) / 1e1},
    generalBuffer: {multiplier: .05, value: null},
    nonDevTotal: 0,
    total: 0,
    coreDevTime: this.props.coreDevTime,
  };
  
  
  handleChange = (nonDevTime, multiplier, name) => {
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement} = this.state   
    this.setState({[name]: {multiplier: (multiplier / 100), value: nonDevTime}})
    this.setState({nonDevTotal: Math.round((design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value)* 1e1) / 1e1})
  };
  
  componentDidMount() {
    const {design, qaTesting, deployment, postDeploymentDev,projectManagement} = this.state;
    this.setState({nonDevTotal: Math.round((design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value) * 1e1) / 1e1});
  };
  
  componentDidUpdate(prevProps, prevState) {
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement} = prevState;
    const {coreDevTime, getNonDevAssumptionsData} = this.props;
    let dt = this.props.coreDevTime;
    if (this.state.coreDevTime !== dt ) {
      this.setState({
        design: {multiplier: design.multiplier, value: coreDevTime * design.multiplier},
        qaTesting: {multiplier: qaTesting.multiplier, value: coreDevTime * qaTesting.multiplier},
        deployment: {multiplier: deployment.multiplier, value: coreDevTime * deployment.multiplier},
        postDeploymentDev: {multiplier: postDeploymentDev.multiplier, value: coreDevTime* postDeploymentDev.multiplier},
        projectManagement: {multiplier: projectManagement.multiplier, value: coreDevTime* projectManagement.multiplier},
        coreDevTime: dt,
      });
      this.updateNonDevTotal();
    };
    if (this.state.nonDevTotal !== prevState.nonDevTotal || this.state.generalBuffer !== prevState.generalBuffer){
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement, generalBuffer, nonDevTotal, total} = this.state;
    const dataToSendToMainDisplay = {design, qaTesting, deployment, postDeploymentDev, projectManagement, generalBuffer, nonDevTotal, total}
    getNonDevAssumptionsData(dataToSendToMainDisplay);
    }
  };
  
  updateNonDevTotal = () => {
    const {design, qaTesting, deployment, postDeploymentDev,projectManagement} = this.state;
    return (Math.round((design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value) * 1e1) / 1e1)
  };

  getGeneralBufferData = (total, data) => {
    const {generalBuffer} = data
    this.setState({generalBuffer: generalBuffer,total })
  }
  
  render() {
    return(
      <div>
        <Grid columns='one' stackable relaxed style={{padding: '20px 50px 20px 50px'}}>
        <Grid.Row>
          <Grid.Column centered>
            <SliderInfo>
              <Header as={DarkText} fSize='small'>Design</Header>
              <Header as={DarkText} fSize='small'>Days: {this.state.design.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='design'
              defaultValue={this.state.design.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
            <br />
            <SliderInfo>
              <Header as={DarkText} fSize='small'>Quality Assurance Testing</Header>
              <Header as={DarkText} fSize='small'>Days: {this.state.qaTesting.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='qaTesting'
              defaultValue={this.state.qaTesting.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
            <br />
            <SliderInfo>
              <Header as={DarkText} fSize='small'>Deployment</Header>
              <Header as={DarkText} fSize='small'>Days: {this.state.deployment.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='deployment'
              defaultValue={this.state.deployment.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
            <br />
            <SliderInfo>
              <Header as={DarkText} fSize='small'>Post Deployment Development</Header>
              <Header as={DarkText} fSize='small'>Days: {this.state.postDeploymentDev.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='postDeploymentDev'
              defaultValue={this.state.postDeploymentDev.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
          </Grid.Column>
            <br />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SliderInfo>
              <Header as={DarkText} fSize='small'>Project Management</Header>
              <Header as={DarkText} fSize='small'>Days: {this.state.projectManagement.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='projectManagement'
              defaultValue={this.state.projectManagement.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {(this.state.nonDevTotal > 0) && 
      <GeneralBufferSlider 
        nonDevTotal={this.updateNonDevTotal}
        coreDevTime={this.props.coreDevTime}
        getGeneralBufferData={this.getGeneralBufferData}
      />
      }
    </div>
    );
  };
};

const SliderInfo = styled.div`


  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  margin-top: -1vh !important;
`

export default NonDevAssumptions;

// *2. Non-Dev Assumptions -* Admin control of assumptions for non-dev related tasks, which are added to final quote, and are calculated from core dev time
//   1. Design: 10% (of core dev time)
//   1. QA Testing: 10%
//   2. Deployment: 3%
//   3. Post-Deployment Development & Bug Fixes: 15%
//   4. Project Management: 10%
//   *5. Subtotal: total # of days and costs*
//   6. General Buffer Time: 5%
//   *7. Total: total # of days and costs*

//   1. Each of these items Includes a +/- feature for admin to easily change assumptions on each project.
//   2. Each item also displays the calculated number of days based on the percentage.