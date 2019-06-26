import React from 'react';
import Navbar from './components/Navbar';
import MainDisplay from './components/MainDisplay';
import WebDisplay from './components/WebDisplay';
import AdminDisplay from './components/AdminDisplay';
import iOSDisplay from './components/iOSDisplay';
import AndroidDisplay from './components/AndroidDisplay';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import ProtectedRoute from './components/ProtectedRoute';
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';

const App = () => (
  <>
    <Navbar />
      <Container>
        <Switch>
          <Route exact path ='/' component={MainDisplay} />
          <Route exact path ='/Admin' component={AdminDisplay} />
          <Route exact path ='/Android' component={AndroidDisplay} />
          <Route exact path ='/iOS' component={iOSDisplay} />
          <Route exact path ='/Web' component={WebDisplay} />
          <Route exact path ='/login' component={Login} />
<<<<<<< HEAD
=======
          <ProtectedRoute exact path ='/admin' component={AdminDisplay} />
>>>>>>> 766d28ac09cf30e6565ae91f5689f526cfa1dcdf
          <Route component={NoMatch} />
          
        </Switch>
      </Container>

  </>
);
export default App;
