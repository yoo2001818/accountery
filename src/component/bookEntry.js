import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Textarea from 'react-textarea-autosize';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaMinus from 'react-icons/lib/fa/minus';
import FaComment from 'react-icons/lib/fa/comment';

import CachedTextInput from './cachedTextInput';
import DropDown from './dropDown';
import style from './bookEntry.css';

const ACCOUNT_DIFF_STYLES = {
  income: style.income,
  expense: style.expense,
  asset: style.asset,
  liability: style.liability,
};

const ACCOUNT_PLACEHOLDER = {
  id: 'placeholder',
  name: '선택...',
  type: 'placeholder',
  currency: 'KRW',
};

class AccountDiff extends Component {
  constructor(props) {
    super(props);
    this.noteNode = null;
    this.state = { editNote: false };
  }
  toggleNote(e) {
    const { editNote } = this.state;
    this.setState({ editNote: !editNote });
    e.preventDefault();
  }
  handleNoteRef(node) {
    if (node == null || this.noteNode === node) return;
    this.noteNode = node;
    node.focus();
    node.select();
    node.addEventListener('blur', () => this.setState({ editNote: false }));
  }
  handleAccountChange(e) {

  }
  handleValueChange(e) {
    const { diff, onChange, onDelete } = this.props;
    if (e.target.value === '' && onDelete != null) onDelete();
    let value = parseFloat(e.target.value);
    if (onChange != null && !isNaN(value)) {
      onChange(Object.assign({}, diff, {
        value: value,
      }));
    }
  }
  handleNoteChange(e) {
    const { diff, onChange } = this.props;
    if (onChange != null) {
      onChange(Object.assign({}, diff, {
        note: e.target.value,
      }));
    }
  }
  render() {
    const { editing, deletable, diff, onDelete, renderAccountList } = this.props;
    let { account, note, value } = diff;
    if (account == null) account = ACCOUNT_PLACEHOLDER;
    const { editNote } = this.state;
    // TODO Move this to somewhere else
    const formatter = new Intl.NumberFormat(undefined,
      { style: 'currency', currency: account.currency });
    // This is so unnecessary, but I wanted to make sure only selected types
    // are accepted as class name.
    const accountClassName = ACCOUNT_DIFF_STYLES[account.type];
    return (
      <li className={classNames(style.accountDiff, {
        [style.editing]: editing,
        [style.editNote]: editNote,
      })}>
        <span className={classNames(style.name, accountClassName)}>
          { editing ? (
            <DropDown title={account.name} left preventClose
              className={style.dropDown}
            >
              { renderAccountList(account) }
            </DropDown>
          ) : account.name }
        </span>
        <div className={style.right}>
          <span className={classNames(style.value,
            value > 0 ? style.positive : (value < 0 && style.negative))}
          >
            { editing ? (
              <CachedTextInput type='number' className={style.value}
                value={String(value)}
                onFocus={e => e.target.select()}
                onChange={this.handleValueChange.bind(this)} />
            ) : formatter.format(value) }
          </span>
          { deletable && (
            <button className={style.delete} onClick={onDelete} tabIndex={-1}>
              <FaMinus />
            </button>
          ) }
        </div>
        { note && !editing && (
          <span className={style.note}>
            { note }
          </span>
        ) }
        { editing && account.type !== 'placeholder' && (
          <span className={style.note}>
            { editNote ? (
              <input type='text' className={style.input} value={note}
                onChange={this.handleNoteChange.bind(this)}
                ref={this.handleNoteRef.bind(this)} />
            ) : (
              <a className={style.noteButton} href='#'
                onMouseDown={e => e.preventDefault()}
                onClick={this.toggleNote.bind(this)}
                onFocus={this.toggleNote.bind(this)}
              >
                { note || <FaComment /> }
              </a>
            ) }
          </span>
        ) }
      </li>
    );
  }
}

AccountDiff.propTypes = {
  editing: PropTypes.bool,
  deletable: PropTypes.bool,
  diff: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  renderAccountList: PropTypes.func,
};

export default class BookEntry extends Component {
  handleAccountDiffDelete(key) {
    const { entry, onChange } = this.props;
    if (onChange != null) {
      onChange(Object.assign({}, entry, {
        accounts: entry.accounts.filter((original, id) => id !== key),
      }));
    }
  }
  handleAccountDiffChange(key, value) {
    const { entry, onChange } = this.props;
    if (onChange != null) {
      if (key === 'new') {
        onChange(Object.assign({}, entry, {
          accounts: entry.accounts.concat(value),
        }));
      } else {
        onChange(Object.assign({}, entry, {
          accounts: entry.accounts.map((original, id) =>
            id === key ? value : original),
        }));
      }
    }
  }
  handleContentChange(e) {
    const { entry, onChange } = this.props;
    if (onChange != null) {
      onChange(Object.assign({}, entry, {
        summary: e.target.value,
      }));
    }
  }
  render() {
    const { entry: { accounts, summary }, focus, editing, renderAccountList,
      } = this.props;
    return (
      <div className={classNames(style.bookEntry, {
        [style.focus]: focus,
        [style.editing]: editing,
      })}>
        <ul className={style.accountDiffs}>
          { accounts.map((diff, key) => (
            <AccountDiff diff={diff} editing={editing} deletable={editing}
              onChange={this.handleAccountDiffChange.bind(this, key)}
              onDelete={this.handleAccountDiffDelete.bind(this, key)}
              renderAccountList={renderAccountList}
              key={key} />
          )) }
          { editing && (
            <AccountDiff diff={{ account: ACCOUNT_PLACEHOLDER }}
              editing={editing}
              renderAccountList={renderAccountList}
              onChange={this.handleAccountDiffChange.bind(this, 'new')} />
          ) }
        </ul>
        <div className={style.content}>
          { editing ? (
            <Textarea className={style.description} value={summary}
              onChange={this.handleContentChange.bind(this)} />
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
  renderAccountList: PropTypes.func,
  onChange: PropTypes.func,
};
