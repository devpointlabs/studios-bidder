import React from 'react';
// import Navbar from './component/Navbar';
// import MainDisplay from './components/MainDisplay';
import Login from './components/Login';
// import Register from './components/Register';
import {Switch, Route, } from 'react-router-dom';
import {Container, } from 'semantic-ui-react';

const App = () => (
  <>
    {/* <Navbar /> */}
      <Container>
        <Switch>
          {/* <Route exact path ='/' component={MainDisplay} /> */}
          <Route exact path ='/login' component={Login} />
          {/* <Route exact path ='/register' component={Register} /> */}
          {/* <Route component={NoMatch} /> */}
          
        </Switch>
      </Container>

  </>
);
export default App;
