import React, { Component } from 'react';

import style from './bookDateEntry.css';

export default class BookDateEntry extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={style.bookDateEntry}>
        { children }
      </div>
    );
  }
}
