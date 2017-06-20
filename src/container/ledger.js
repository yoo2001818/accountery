import React, { Component } from 'react';

import style from './ledger.css';

import BookDateEntry from '../component/bookDateEntry';
import BookEntry from '../component/bookEntry';

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
        name: '잡손실',
        type: 'expense',
        currency: 'KRW',
        // Current value is not known at the moment
      },
      '0cdef': {
        name: '보통예금',
        type: 'asset',
        currency: 'KRW',
      },
    };
    const entrySchema = this.state.entry;
    const renderAccountList = () => (
      <div>Test</div>
    );
    // Apply accountSchema to entrySchema - 'flatten' it.
    return (
      <div className={style.ledger}>
        <BookDateEntry date={Date.now()}>
          <li>
            <BookEntry focus
              entry={Object.assign({}, entrySchema, {
                accounts: entrySchema.accounts.map(info => Object.assign({},
                  info, { account: accountSchema[info.id] })),
              })}
              onChange={this.handleEntryChange.bind(this)}
              renderAccountList={renderAccountList}
            />
          </li>
          { [0, 1, 2, 3, 4].map(v => (
            <li key={v}>
              <BookEntry editing
                entry={Object.assign({}, entrySchema, {
                  accounts: entrySchema.accounts.map(info => Object.assign({},
                    info, { account: accountSchema[info.id] })),
                })}
                onChange={this.handleEntryChange.bind(this)}
                renderAccountList={renderAccountList}
              />
            </li>
          )) }
        </BookDateEntry>
      </div>
    );
  }
}
