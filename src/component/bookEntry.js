import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Textarea from 'react-textarea-autosize';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaMinus from 'react-icons/lib/fa/minus';

import DropDown from './dropDown';
import style from './bookEntry.css';

const ACCOUNT_DIFF_STYLES = {
  income: style.income,
  expense: style.expense,
  asset: style.asset,
  liability: style.liability,
};

export default class BookEntry extends Component {
  renderAccountDiff(diff, key) {
    const { editing } = this.props;
    const { account, note, value } = diff;
    // TODO Move this to somewhere else
    const formatter = new Intl.NumberFormat(undefined,
      { style: 'currency', currency: account.currency });
    // This is so unnecessary, but I wanted to make sure only selected types
    // are accepted as class name.
    const accountClassName = ACCOUNT_DIFF_STYLES[account.type];
    // TODO Unlike other stuff, maybe we should use different layout while
    // editing since every field has to stay on a single line - it doesn't get
    // changed...
    return (
      <li className={classNames(style.accountDiff, {
        [style.editing]: editing,
      })} key={key}>
        <span className={classNames(style.name, accountClassName)}>
          { account.name }
        </span>
        { note && !editing && (
          <span className={style.note}>
            { note }
          </span>
        ) }
        { editing && (
          <input type='text' className={style.note} value={note} />
        ) }
        <div className={style.right}>
          <span className={classNames(style.value,
            value > 0 ? style.positive : style.negative)}
          >
            { formatter.format(value) }
          </span>
          { editing && (
            <button className={style.delete}
              onClick={this.handleAccountDiffDelete.bind(this, key)}
            >
              <FaMinus />
            </button>
          ) }
        </div>
      </li>
    );
  }
  handleAccountDiffDelete(key) {
    // TODO
  }
  render() {
    const { entry: { accounts, summary }, focus, editing } = this.props;
    return (
      <div className={classNames(style.bookEntry, {
        [style.focus]: focus,
        [style.editing]: editing,
      })}>
        <ul className={style.accountDiffs}>
          { accounts.map(this.renderAccountDiff.bind(this)) }
        </ul>
        <div className={style.content}>
          { editing ? (
            <Textarea className={style.description} value={summary} />
          ) : (
            <p className={style.description}>
              { summary }
            </p>
          )}
          <div className={style.menu}>
            <DropDown title={<FaCaretDown />}
              className={style.dropDown} openClassName={style.open}
            >
              <div>aa and that</div>
            </DropDown>
          </div>
        </div>
      </div>
    );
  }
}

BookEntry.propTypes = {
  // TODO Add detailed props
  entry: PropTypes.object,
  focus: PropTypes.bool,
  editing: PropTypes.bool,
};
