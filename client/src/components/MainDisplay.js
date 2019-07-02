import React,{useState} from 'react';
import WebDisplay from './WebDisplay';
import IOSDisplay from './iOSDisplay';
import AndroidDisplay from './AndroidDisplay';
import { Button, Form } from "semantic-ui-react";
import "./MainDisplay.css"
import axios from "axios";

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
    <div>
      <h1 align="center">Estimate Your App Cost</h1>
      <div className="container1">
        <h1> Main Display</h1>
        <Button onClick={handleWeb} className="btn" >
          Web App
        </Button>
        <Button onClick={handleiOS} className="btn" >
          iOS App
        </Button>
        <Button onClick={handleAndroid} className="btn" >
          Android App
        </Button>
      </div>
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

    </div>
    
    )
};

export default MainDisplay;