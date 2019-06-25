import React from 'react';
// import Navbar from './component/Navbar';
import MainDisplay from './components/MainDisplay';
import AdminDisplay from './components/AdminDisplay';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';

const App = () => (
  <>
    {/* <Navbar /> */}
      <Container>
        <Switch>
          <Route exact path ='/' component={MainDisplay} />
          <Route exact path ='/login' component={Login} />
          <Route exact path ='/admin' component={AdminDisplay} />
          <Route component={NoMatch} />
          
        </Switch>
      </Container>

  </>
);
export default App;
