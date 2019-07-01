import React, {useState, useContext} from 'react';
import { AuthContext, } from '../providers/AuthProvider';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    const {history} = props
    e.preventDefault();
    auth.handleLogin({email, password, }, history)
  };

    return(
      <Segment basic>
        <Header as='h1' textAlign='center'>Admin Login</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Email"
            autoFocus
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Input
            label="Password"
            autoFocus
            required
            type="password"
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button>Sign In</Button>
        </Form>
      </Segment>
    )
};

export default Login;