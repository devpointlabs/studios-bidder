import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router,} from 'react-router-dom';
import { AuthProvider, } from './providers/AuthProvider';
import { MathProvider, } from './providers/MathProvider';
import { FeatureProvider, } from './providers/FeatureProvider';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<AuthProvider>
  <MathProvider>
    <FeatureProvider>
      <Router>
        <App />
      </Router>
    </FeatureProvider>
  </MathProvider>
</AuthProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
