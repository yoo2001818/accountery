import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import App from './view/app';
import style from './view/app.css';

// Create container element
let container = document.createElement('div');
document.body.appendChild(container);
container.className = style.root;

// Create store
let store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
