import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './bookDateEntry.css';

import { formatDate } from '../util/date';

export default class BookDateEntry extends Component {
  render() {
    const { children, date } = this.props;
    return (
      <div className={style.bookDateEntry}>
        <p className={style.header}>
          { formatDate(date) }
        </p>
        <ul className={style.list}>
          { children }
        </ul>
      </div>
    );
  }
}

BookDateEntry.propTypes = {
  date: PropTypes.number,
  children: PropTypes.node,
};
