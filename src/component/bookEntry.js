import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './bookEntry.css';

const ACCOUNT_DIFF_STYLES = {
  income: style.income,
  expense: style.expense,
  asset: style.asset,
  liability: style.liability,
};

export default class BookEntry extends Component {
  renderAccountDiff(diff, key) {
    const { account, note, value } = diff;
    // TODO Move this to somewhere else
    const formatter = new Intl.NumberFormat(undefined,
      { style: 'currency', currency: account.currency });
    // This is so unnecessary, but I wanted to make sure only selected types
    // are accepted as class name.
    const accountClassName = ACCOUNT_DIFF_STYLES[account.type];
    return (
      <li className={style.accountDiff} key={key}>
        <span className={classNames(style.name, accountClassName)}>
          { account.name }
        </span>
        { note && (
          <span className={style.note}>
            { note }
          </span>
        ) }
        <span className={classNames(style.value,
          value > 0 ? style.positive : style.negative)}
        >
          { formatter.format(value) }
        </span>
      </li>
    );
  }
  render() {
    const { entry: { id, date, accounts, summary }, focus } = this.props;
    return (
      <div className={classNames(style.bookEntry, { [style.focus]: focus })}>
        <ul className={style.accountDiffs}>
          { accounts.map(this.renderAccountDiff.bind(this)) }
        </ul>
        <div className={style.content}>
          <p className={style.description}>
            { summary }
          </p>
          <p className={style.details} />
        </div>
        { focus && (
          <div className={style.menu}>
            Hello!
          </div>
        ) }
      </div>
    );
  }
}

BookEntry.propTypes = {
  // TODO Add detailed props
  entry: PropTypes.object,
  focus: PropTypes.bool,
};
