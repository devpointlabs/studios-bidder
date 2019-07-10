import React from 'react';
import {Grid, } from 'semantic-ui-react';
import SliderBar from './SliderBar';


class NonDevAssumptions extends React.Component {
//UPDATE STATE VALUES AUTOMATICALLY///////////////////////////////////////
//SHOW DAYS/DOLLARS NEXT TO HEADERS//////////////////////////////////////
  state = {
    design: {multiplier: 10, value: ''},
    qaTesting: {multiplier: 10, value: ''},
    deployment: {multiplier: 3, value: ''},
    postDeploymentDev: {multiplier: 15, value: ''},
    projectManagement: {multiplier: 10, value: ''},
    generalBuffer: {multiplier: 5, value: ''},
    subTotal: '',
    total: '',
  }

  handleChange = (nonDevTime, multiplier, name) => {   
    this.setState({[name]: {multiplier: multiplier, value: nonDevTime}})
  };

  render() {
    return(
      <>
        <h1>Non Dev Assumptions</h1>
        <br />
        <br />
        <br />
        <Grid columns='two' divided>

        <Grid.Row>
          <Grid.Column>
            <h4>Design</h4>
            <SliderBar 
              name='design'
              defaultValue={this.state.design.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
            />
          </Grid.Column>
            <br />
          <Grid.Column>
            <h4>QA Testing</h4>
            <SliderBar 
              name='qaTesting'
              defaultValue={this.state.qaTesting.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
            />
          </Grid.Column>
            <br />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h4>Deployment</h4>
            <SliderBar 
              name='deployment'
              defaultValue={this.state.deployment.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
            />
          </Grid.Column>
            <br />
          <Grid.Column>
            <h4>Post Deployment Dev</h4>
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
            <h4>Project Management</h4>
            <SliderBar 
              name='projectManagement'
              defaultValue={this.state.projectManagement.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
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