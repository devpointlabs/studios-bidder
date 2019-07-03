import React,{useState} from 'react';
import Navbar from './Navbar';
import WebDisplay from './WebDisplay';
import IOSDisplay from './iOSDisplay';
import AndroidDisplay from './AndroidDisplay';
import WhiteText from "../styles/WhiteText";
import MainTitle from '../styles/MainTitle';
import {Icon, Segment, Header, Form} from 'semantic-ui-react';
import Colors from "../styles/Colors";
import axios from 'axios'


const MainDisplay = () => {
  const [focus, setFocus] = useState("web");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [features, setFeatures] = useState([])
  // const [webSelections, setWebSelections] = useState({})
  // const [iosSelections, setIOSSelections] = useState({})
  // const [androidSelections, setAndroidSelections] = useState({})

  // BIG SUBMIT FUNCTION(EACH STATE)
  const handleSubmit = () => {
    createEstimateRecord()

  };

  const createEstimateRecord = () => {
    const estimate = {customer_name: name, customer_email: email}
    axios.post(`/api/estimates`, estimate)
      // .then DO SOMETHING AFTER SUBMIT???????????????????????????
    setEmail('')
    setName('')
  };

  const handleWeb = () => {
    setFocus('web')
  };

  const handleiOS = () => {
    setFocus('ios')
  };

  const handleAndroid = () => {
    setFocus('android')
  };

  const displayForm = () => {
    switch(focus){
      case 'web': return <WebDisplay handleSubmit={handleSubmit} />;
      case 'ios': return <IOSDisplay handleSubmit={handleSubmit} />;
      case "android": return <AndroidDisplay handleSubmit={handleSubmit} />;
      default: return <h1>You broke the platform switcher</h1>
    };
  };


  return(
    <Segment.Group Vertical as={Colors} colored="white">
      {/* <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"></link> */}
      {/* <style>@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');</style> */}
      <Navbar/>
      <Header align="center" as={MainTitle} colored="dark-grey" fSize="large">
        Estimate Your App
      </Header>
      <Header align="center" as={MainTitle} colored="dark-grey"  fSize="small">
        Select the items below which best describe your app and the features you require.
      </Header>
      <Header align="center" as={MainTitle} colored="light-grey" padding="tiny" fSize="tiny">
        All estimates are approximate but should give you a rough idea of what it will take to build your app.
      </Header>
      <Segment.Group horizontal>
        <Segment onClick={handleWeb} as={Colors} colored="light">
            <br/>
            <Header align="center" as={WhiteText} fSize="medium">
              <Icon name="computer"/>  Web App
            </Header>
            <Header align="center" as={WhiteText} fSize="small">
              A web app or a 
              <br/>back-end to a mobile app
            </Header>
            <br/>
        </Segment>
        <Segment onClick={handleiOS} as={Colors} colored="medium-dark">
          <br/>
          <Header align="center" as={WhiteText} fSize="medium">
            <Icon name="apple"/>  iOS App
          </Header>
          <Header align="center" as={WhiteText} fSize="small">
              An iPhone/ iPad app 
              <br/>(Excluding back-end)
          </Header>
        </Segment>
        <Segment onClick={handleAndroid} as={Colors} colored="dark">
          <br/> 
          <Header align="center" as={WhiteText} fSize="medium">
            <Icon name="android"/>Android App
          </Header>
          <Header align="center" as={WhiteText} fSize="small">
              An Android/ Tablet App
              <br/>(Excluding back-end)
          </Header>
        </Segment>
      </Segment.Group>
      {displayForm()}
      <br />
      <Form widths='equal'>
        <Form.Input 
          type='text'
          onChange={(e) => setName(e.target.value)}
          label='Name'
          value={name}
        />
        <Form.Input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          label='Email'
          value={email}
        />
        <Form.Button onClick={handleSubmit} >Submit for Quote</Form.Button>
      </Form>
    </Segment.Group>
    )
};

export default MainDisplay;