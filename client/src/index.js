import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/App.css';
import App from './App';
import {Provider} from './Context';

/**
 * Spread state values from Contex.js {Provider}
 */
ReactDOM.render(
  <Provider>
    <App />
  </Provider>
  , document.getElementById('root'));
