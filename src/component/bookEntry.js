import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Textarea from 'react-textarea-autosize';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaMinus from 'react-icons/lib/fa/minus';
import FaComment from 'react-icons/lib/fa/comment';

import DropDown from './dropDown';
import style from './bookEntry.css';

const ACCOUNT_DIFF_STYLES = {
  income: style.income,
  expense: style.expense,
  asset: style.asset,
  liability: style.liability,
};

class AccountDiff extends Component {
  constructor(props) {
    super(props);
    this.state = { editNote: false };
  }
  toggleNote(e) {
    const { editNote } = this.state;
    this.setState({ editNote: !editNote });
  }
  handleNoteRef(node) {
    if (node == null) return;
    node.focus();
    node.addEventListener('blur', () => this.setState({ editNote: false }));
  }
  render() {
    const { editing, diff: { account, note, value }, onDelete } = this.props;
    const { editNote } = this.state;
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
        [style.editNote]: editNote,
      })}>
        <span className={classNames(style.name, accountClassName)}>
          { account.name }
        </span>
        <div className={style.right}>
          <span className={classNames(style.value,
            value > 0 ? style.positive : style.negative)}
          >
            { formatter.format(value) }
          </span>
          { editing && (
            <button className={style.delete} onClick={onDelete}>
              <FaMinus />
            </button>
          ) }
        </div>
        { (note || editing) && (
          <span className={style.note}>
            { (editing && editNote) ? (
              <input type='text' className={style.input} value={note}
                ref={this.handleNoteRef.bind(this)} />
            ) : note }
          </span>
        ) }
        { editing && (
          <span className={style.noteButton}>
            <button className={style.comment}
              onMouseDown={e => e.preventDefault()}
              onClick={this.toggleNote.bind(this)}
            >
              <FaComment />
            </button>
          </span>
        ) }
      </li>
    );
  }
}

AccountDiff.propTypes = {
  editing: PropTypes.bool,
  diff: PropTypes.object,
  onDelete: PropTypes.func,
};

export default class BookEntry extends Component {
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
          { accounts.map((diff, key) => (
            <AccountDiff diff={diff} editing={editing} key={key} />
          )) }
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
