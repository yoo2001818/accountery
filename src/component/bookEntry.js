import React, { Component, PropTypes } from 'react';
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
          { value }
        </span>
      </li>
    );
  }
  render() {
    const { entry: { accounts, summary } } = this.props;
    return (
      <div className={style.bookEntry}>
        <ul className={style.accountDiffs}>
          { accounts.map(this.renderAccountDiff.bind(this)) }
        </ul>
        <p className={style.description}>
          { summary }
        </p>
      </div>
    );
  }
}

BookEntry.propTypes = {
  // TODO Add detailed props
  entry: PropTypes.object,
};
