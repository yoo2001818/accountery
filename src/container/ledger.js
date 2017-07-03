import React, { Component } from 'react';

import style from './ledger.css';

import BookDateEntry from '../component/bookDateEntry';
import BookEntry from '../component/bookEntry';
import CachedForm from '../component/cachedForm';
import SearchBox from '../component/searchBox';

export default class Ledger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        id: '01234567',
        date: Date.now(),
        accounts: [
          { id: '0abcd', value: 105400, note: '갸아악' },
          { id: '0cdef', value: -236789, note: '' },
        ],
        summary: '버튼 잘못 눌러서 돈 나감',
      },
    };
  }
  handleEntryChange(value) {
    this.setState({ entry: value });
  }
  render() {
    const accountSchema = {
      '0abcd': {
        id: '0abcd',
        name: '잡손실',
        type: 'expense',
        currency: 'KRW',
        // Current value is not known at the moment
      },
      '0cdef': {
        id: '0cdef',
        name: '보통예금',
        type: 'asset',
        currency: 'KRW',
      },
    };
    const entrySchema = this.state.entry;
    const renderAccountList = (account, onSelect) => (
      <SearchBox selectedId={account.id}
        onSelect={onSelect}
        data={Object.keys(accountSchema).map(v => accountSchema[v])} />
    );
    // Apply accountSchema to entrySchema - 'flatten' it.
    return (
      <div className={style.ledger}>
        <BookDateEntry date={Date.now()}>
          <li>
            <BookEntry focus
              value={Object.assign({}, entrySchema, {
                accounts: entrySchema.accounts.map(info => Object.assign({},
                  info, { account: accountSchema[info.id] })),
              })}
              onChange={this.handleEntryChange.bind(this)}
              renderAccountList={renderAccountList}
            />
          </li>
          { [0, 1, 2, 3, 4].map(v => (
            <li key={v}>
              <CachedForm
                onChange={this.handleEntryChange.bind(this)}
                value={Object.assign({}, entrySchema, {
                  accounts: entrySchema.accounts.map(info => Object.assign({},
                    info, { account: accountSchema[info.id] })),
                })}
              >
                <BookEntry editing
                  renderAccountList={renderAccountList}
                />
              </CachedForm>
            </li>
          )) }
        </BookDateEntry>
      </div>
    );
  }
}
