import React, {useState, useEffect} from 'react';
import OSMath from './OSMath';
import {Icon, Segment, Header,} from 'semantic-ui-react';
import WhiteText from "../styles/WhiteText";
import Colors from "../styles/Colors";

const PlatformTabs = (props) => {
  const {handleWeb, handleiOS, handleAndroid} = props
  const [windowWidth, setWindowWidth] =useState('')

  useEffect( () => {
    setWindowWidth(window.innerWidth);
  })


return (
  <>
   <Segment onClick={handleWeb} style={{cursor:'pointer'}} as={Colors} colored="light">
    { windowWidth > 500 ?
    <>
      <br/>
      <Header align="center" as={WhiteText} fSize="medium">
        <Icon name="computer"/>  Web App
      </Header>
        <Header align="center" as={WhiteText} fSize="small">
        A web app or a 
        <br/>back-end to a mobile app
      </Header>
      <OSMath OS='web'/>
      <br/>
      </>
  : 
    <>
      <br />
      <Header align="center" as={WhiteText} fSize="medium">
        <Icon name="computer"/>
      </Header>
        <Header align="center" as={WhiteText} fSize="small">
        Web App
      </Header>
      <OSMath OS='web'/>
    </>
}
</Segment>
<Segment onClick={handleiOS} style={{cursor:'pointer'}} as={Colors} colored="medium-dark">
{ windowWidth > 500 ?
  <>
    <br/>
    <Header align="center" as={WhiteText} fSize="medium">
      <Icon name="apple"/>  iOS
    </Header>
    <Header align="center" as={WhiteText} fSize="small">
        An iPhone/ iPad app 
        <br/>(Excluding back-end)
    </Header>
    <OSMath OS='ios'/>
  </>
  :
  <>
    <br/>
    <Header align="center" as={WhiteText} fSize="medium">
      <Icon name="apple"/>
    </Header>
    <Header align="center" as={WhiteText} fSize="small">
        iOS App
        <br/>
    </Header>
    <OSMath OS='ios'/>
  </>
}
</Segment>
<Segment onClick={handleAndroid} style={{cursor:'pointer'}} as={Colors} colored="dark">
  { windowWidth > 500 ?
  <>
    <br/> 
    <Header align="center" as={WhiteText} fSize="medium">
      <Icon name="android"/>Android
    </Header>
    <Header align="center" as={WhiteText} fSize="small">
        An Android/ Tablet App
        <br/>(Excluding back-end)
    </Header>
    <OSMath OS='android'/>
  </> 
  :
  <>
  <br/> 
  <Header align="center" as={WhiteText} fSize="medium">
    <Icon name="android"/>
  </Header>
  <Header align="center" as={WhiteText} fSize="small">
      Android App
      <br/>
  </Header>
  <OSMath OS='android'/>

</> 
}
</Segment>
</>
  );
};

export default PlatformTabs;