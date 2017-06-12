import React, { Component } from 'react';

import style from './app.css';

import Ledger from '../container/ledger';
import TitleBar from '../container/titleBar';
import AppContainer from '../container/appContainer';

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <TitleBar title='Ledger' />
        <Ledger />
      </AppContainer>
    );
  }
}
