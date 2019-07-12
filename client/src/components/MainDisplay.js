import React,{useState, useContext, useEffect} from 'react';
import Navbar from './Navbar';
import OSMath from './OSMath';
import TotalMath from './TotalMath';
import WebDisplay from './WebDisplay';
import IOSDisplay from './iOSDisplay';
import AndroidDisplay from './AndroidDisplay';
import SummaryPage from './SummaryPage';
import SummaryModal from './SummaryModal';
import WhiteText from "../styles/WhiteText";
import MainTitle from '../styles/MainTitle';
import {Icon, Segment, Header, Form, Modal, Button} from 'semantic-ui-react';
import Colors from "../styles/Colors";
import styled from "styled-components";
import axios from 'axios';
import {MathContext,} from '../providers/MathProvider';
import { FeatureContext} from '../providers/FeatureProvider';

const MainDisplay = () => {
  const [focus, setFocus] = useState("web");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [estimate_id, setEstimate_id] = useState('');
  // const [platforms, setPlatforms] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [radioButtons, setRadioButtons] = useState([]);
  // const [modalClose, setModalClose] = useState(true);

  const {resetMath, exclusiveWebDays, exclusiveiOSDays, exclusiveAndroidDays} = useContext(MathContext);
  const { handleFeatures, handleCategories } = useContext(FeatureContext);

  // close = () => useState({ modalClose: true })

      // useEffect( () => {
  //   axios.get(`/api/platforms`)
  //   .then(res=>setPlatforms(res.data))
  // });

    useEffect( () => {
    // axios.get(`/api/platforms`)
    //   .then(res=>setPlatforms(res.data))
  
    axios.get(`/api/all_categories`)
      .then( res  => handleCategories(res.data));

    axios.get(`/api/all_features`)
      .then(res => handleFeatures(res.data))
  },[]);

  const handleSubmit = () => {
    selectedFeatures.push(...exclusiveWebDays.map( ewd => ewd.id), ...exclusiveiOSDays.map( eid => eid.id),...exclusiveAndroidDays.map( ead => ead.id), )
    const estimate = {customer_name: name, customer_email: email};
    axios.post(`/api/estimates`, estimate, {params: { selectedFeatures: selectedFeatures}})
      .then( res => {
        // setEmail('')
        // setName('')
        // setSelectedFeatures([])
        // setRadioButtons([])
        // resetMath()
        // console.log(res.data)
        setEstimate_id(res.data)
        // console.log(res.data)
        // debugger
        }
      )
      .catch(error => console.log(error));
  };

  // const handleModal = () => {
  //       setEmail('')
  //       setName('')
  //       setSelectedFeatures([])
  //       setRadioButtons([])
  //       resetMath()
  //     }
      

  const handleWeb = () => {
    setFocus('web');
  };

  const handleiOS = () => {
    setFocus('ios');
  };

  const handleAndroid = () => {
    setFocus('android');
  };

  const displayForm = () => {
    switch(focus){
      case 'web': return <WebDisplay
                            handleSubmit={handleSubmit} 
                            setSelectedFeatures={setSelectedFeatures}
                            selectedFeatures={selectedFeatures}
                            setRadioButtons={setRadioButtons}
                            radioButtons={radioButtons}/>;
      case 'ios': return <IOSDisplay 
                            handleSubmit={handleSubmit} 
                            setSelectedFeatures={setSelectedFeatures} 
                            selectedFeatures={selectedFeatures}
                            setRadioButtons={setRadioButtons}
                            radioButtons={radioButtons}/>;
      case "android": return <AndroidDisplay 
                                handleSubmit={handleSubmit}
                                setSelectedFeatures={setSelectedFeatures} 
                                selectedFeatures={selectedFeatures}
                                setRadioButtons={setRadioButtons}
                                radioButtons={radioButtons} />;
      default: return <h1>You broke the platform switcher</h1>;
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
      <Segment.Group horizontal as={NoLine}>
        <Segment onClick={handleWeb} style={{cursor:'pointer'}} as={Colors} colored="light">
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
        <Segment onClick={handleiOS} style={{cursor:'pointer'}} as={Colors} colored="medium-dark">
          <br/>
          <Header align="center" as={WhiteText} fSize="medium">
            <Icon name="apple"/>  iOS App
          </Header>
          <Header align="center" as={WhiteText} fSize="small">
              An iPhone/ iPad app 
              <br/>(Excluding back-end)
          </Header>
        </Segment>
        <Segment onClick={handleAndroid} style={{cursor:'pointer'}} as={Colors} colored="dark">
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
      <Segment.Group horizontal as={NoLine}>
        <Segment onClick={handleWeb} style={{cursor:'pointer'}} as={Colors} colored="light">
            <br/>
            <Header align="center" as={WhiteText} fSize="medium">
              <Icon name="computer"/>  Add a Web App?
            </Header>
            <Header align="center" as={WhiteText} fSize="small">
              A web app or a 
              <br/>back-end to a mobile app
            </Header>
            <OSMath OS='web'/>
            <br/>
        </Segment>
        <Segment onClick={handleiOS} style={{cursor:'pointer'}} as={Colors} colored="medium-dark">
          <br/>
          <Header align="center" as={WhiteText} fSize="medium">
            <Icon name="apple"/>  Add an iOS App?
          </Header>
          <Header align="center" as={WhiteText} fSize="small">
              An iPhone/ iPad app 
              <br/>(Excluding back-end)
          </Header>
          <OSMath OS='ios'/>
        </Segment>
        <Segment onClick={handleAndroid} style={{cursor:'pointer'}} as={Colors} colored="dark">
          <br/> 
          <Header align="center" as={WhiteText} fSize="medium">
            <Icon name="android"/>Add an Android App?
          </Header>
          <Header align="center" as={WhiteText} fSize="small">
              An Android/ Tablet App
              <br/>(Excluding back-end)
          </Header>
          <OSMath OS='android'/>
        </Segment>
      </Segment.Group>
      <TotalMath />
      <Segment as={Colors} colored="light-grey" style={{padding: '20px 70px 20px 70px'}}>
        <Header align="center" as={MainTitle} colored="dark-grey"  fSize="tiny">
          client's name and email to save estimate
        </Header>
        <FormBorder>
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
            <Modal  
                    // closeIcon
                    // closeOnDimmerClick={false} 
                    // closeOnEscape={false} 
                    // closeOnDocumentClick={false}
                    trigger={
                    <Form.Button onClick={handleSubmit} basic>Submit for Estimate Summary</Form.Button>
                    }>
              <SummaryPage eID={estimate_id} submit={handleSubmit} name={name} email={email}/>
              {/* <Modal.Actions>
                <Button>
                  <Icon name='remove' /> Go back and edit these choices
                </Button>
                <Button
                  onClick={handleModal}
                  labelPosition='right'
                  icon='checkmark'
                  content='Save and close this estimate'
              />
              </Modal.Actions> */}
            </Modal>
          </Form>
        </FormBorder>
      </Segment>
    </Segment.Group>
  )
};

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
`

const FormBorder = styled.div`
  padding: 30px !important;
  border-top: 5px !important;
  border-top-width: 5px !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  margin-top:10px;
  border-radius: 4px;
  padding: 20px; 
  background: white !important;
`

export default MainDisplay;

