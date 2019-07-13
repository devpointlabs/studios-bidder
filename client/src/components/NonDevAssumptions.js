import React from 'react';
// import {Grid, } from 'semantic-ui-react';
import SliderBar from './SliderBar';
import {Table, Row, Cell, SliderCell} from '../styles/SliderTable';
import GeneralBufferSlider from './GeneralBufferSlider';

class NonDevAssumptions extends React.Component {
  state = {
    design: {multiplier: .10, value: this.props.coreDevTime * .1},
    qaTesting: {multiplier: .10, value: this.props.coreDevTime * .1},
    deployment: {multiplier: .03, value: this.props.coreDevTime * .03},
    postDeploymentDev: {multiplier: .15, value: this.props.coreDevTime * .15},
    projectManagement: {multiplier: .10, value: this.props.coreDevTime * .1},
    generalBuffer: .05,
    nonDevTotal: 0,
    coreDevTime: this.props.coreDevTime,
  };
  
  
  handleChange = (nonDevTime, multiplier, name) => {
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement} = this.state   
    this.setState({[name]: {multiplier: (multiplier / 100), value: nonDevTime}})
    this.setState({nonDevTotal: (design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value).toFixed(1)})
  };
  
  componentDidMount() {
    const {design, qaTesting, deployment, postDeploymentDev,projectManagement} = this.state;
    this.setState({nonDevTotal: (design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value).toFixed(1)});
  };
  
  componentDidUpdate(prevProps, prevState) {
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement} = prevState;
    const {coreDevTime} = this.props;
    if (this.state.coreDevTime !== this.props.coreDevTime ) {
      this.setState({
        design: {multiplier: design.multiplier, value: coreDevTime * design.multiplier},
        qaTesting: {multiplier: qaTesting.multiplier, value: coreDevTime * qaTesting.multiplier},
        deployment: {multiplier: deployment.multiplier, value: coreDevTime * deployment.multiplier},
        postDeploymentDev: {multiplier: postDeploymentDev.multiplier, value: coreDevTime* postDeploymentDev.multiplier},
        projectManagement: {multiplier: projectManagement.multiplier, value: coreDevTime* projectManagement.multiplier},
        coreDevTime: this.props.coreDevTime,
      });
      this.updateNonDevTotal();
    };
    if (this.state.nonDevTotal !== prevState.nonDevTotal){
    const dataToSendToMainDisplay = {design: this.state.design.multiplier, qaTesting: this.state.qaTesting.multiplier, deployment: this.state.deployment.multiplier, postDeploymentDev: this.state.postDeploymentDev.multiplier, projectManagement: this.state.projectManagement.multiplier, generalBuffer: this.state.generalBuffer};
    this.props.getNonDevAssumptionsData(dataToSendToMainDisplay);
    }
  };
  
  updateNonDevTotal = () => {
    const {design, qaTesting, deployment, postDeploymentDev,projectManagement} = this.state;
    return (design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value).toFixed(1)
  };

  getGeneralBufferData = (data) => {
    this.setState({generalBuffer: data})
  }
  
  render() {
    return(
      <>
        <Table>
          <tbody>
          <Row>
            <Cell position='left'><h3>Design</h3></Cell>
            <SliderCell> 
              <SliderBar 
                name='design'
                defaultValue={this.state.design.multiplier}
                coreDevTime={this.props.coreDevTime}
                handleChange={this.handleChange}
              />
          </SliderCell>
          <Cell position='right'>
              <h3>Days: {this.state.design.value.toFixed(1)}</h3>
          </Cell>
          </Row>
          <Row>
            <Cell position='left'><h3>QA Testing</h3></Cell>
            <SliderCell> 
              <SliderBar 
                name='qaTesting'
                defaultValue={this.state.qaTesting.multiplier}
                coreDevTime={this.props.coreDevTime}
                handleChange={this.handleChange}
              />
          </SliderCell>
          <Cell position='right'>
              <h3>Days: {this.state.qaTesting.value.toFixed(1)}</h3>
          </Cell>
          </Row>
          <Row>
            <Cell position='left'><h3>Deployment</h3></Cell>
            <SliderCell> 
              <SliderBar 
                name='deployment'
                defaultValue={this.state.deployment.multiplier}
                coreDevTime={this.props.coreDevTime}
                handleChange={this.handleChange}
              />
          </SliderCell>
          <Cell position='right'>
              <h3>Days: {this.state.deployment.value.toFixed(1)}</h3>
          </Cell>
          </Row>
          <Row>
            <Cell position='left'><h3><span>Post </span><br /><span>Deployment</span><br/><span> Dev</span></h3></Cell>
            <SliderCell> 
              <SliderBar 
                name='postDeploymentDev'
                defaultValue={this.state.postDeploymentDev.multiplier}
                coreDevTime={this.props.coreDevTime}
                handleChange={this.handleChange}
              />
          </SliderCell>
          <Cell position='right'>
              <h3>Days: {this.state.postDeploymentDev.value.toFixed(1)}</h3>
          </Cell>
          </Row>
          <Row>
            <Cell position='left'><h3><span>Project</span><br /><span>Management</span></h3></Cell>
            <SliderCell> 
              <SliderBar 
                name='projectManagement'
                defaultValue={this.state.projectManagement.multiplier}
                coreDevTime={this.props.coreDevTime}
                handleChange={this.handleChange}
              />
          </SliderCell>
          <Cell position='right'>
              <h3>Days: {this.state.projectManagement.value.toFixed(1)}</h3>
          </Cell>
          </Row>
          </tbody>
        </Table>
        {(this.state.nonDevTotal > 0) && 
        <GeneralBufferSlider 
          nonDevTotal={this.updateNonDevTotal()}
          coreDevTime={this.props.coreDevTime}
          getGeneralBufferData={this.getGeneralBufferData}
        />
        }
      </>
    );
  };
};


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