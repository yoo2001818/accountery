import React, { Component } from 'react';

import style from './app.css';

import Ledger from '../container/ledger';

export default class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.sideMenu}>
          This is a side menu.
        </div>
        <div className={style.content}>
          <Ledger />
        </div>
      </div>
    );
  }
}
