import React from 'react';
import MainDisplay from './components/MainDisplay';
import WebDisplay from './components/WebDisplay';
import AdminDisplay from './components/AdminDisplay';
import EstimateHistory from './components/EstimateHistory';
import iOSDisplay from './components/iOSDisplay';
import AndroidDisplay from './components/AndroidDisplay';
import SummaryPage from './components/summary/SummaryPage';
import Features from './components/Features';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import ProtectedRoute from './components/ProtectedRoute';
import {Switch, Route, } from 'react-router-dom';
import styled from "styled-components";


const App = () => (
  <>
  <AppContainer>
    <MidContainer>
        <Switch>
          <Route exact path ='/' component={MainDisplay} />
          <Route exact path ='/History' component={EstimateHistory} />
          <Route exact path ='/Admin' component={AdminDisplay} />
          <Route exact path ='/Android' component={AndroidDisplay} />
          {/* <Route exact path ='/Summary' component={SummaryPage} /> */}
          <Route exact path ='/iOS' component={iOSDisplay} />
          <Route exact path ='/Web' component={WebDisplay} />
          <Route exact path="/api/features" component={Features} />
          <Route exact path ='/login' component={Login} />
          <ProtectedRoute exact path ='/admin' component={AdminDisplay} />
          <Route component={NoMatch} />
        </Switch>
      </MidContainer>
  </AppContainer>
  </>
);

const AppContainer = styled.div`
  background-color: #F5F5F5;
`;

const MidContainer = styled.div`
  margin-right: 80px;
  margin-left: 80px;
`;

export default App;
