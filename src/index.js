import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './store/reducer';

import App from './App';
// import * as serviceWorker from './serviceWorker';

import './index.scss';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose);

const store = createStore(reducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

const players = document.querySelectorAll('.field-team .field-player');

for(let i = 0; i < players.length; i++) {
  players[i].addEventListener('transitionstart', (pl) => {
    players[i].classList.add("moving");
  });
  players[i].addEventListener('transitionend', (pl) => {
    players[i].classList.remove("moving");
  });
}