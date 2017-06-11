import React, { Component } from 'react';

import BookDateEntry from '../component/bookDateEntry';
import BookEntry from '../component/bookEntry';

export default class Ledger extends Component {
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
    const entrySchema = {
      id: '01234567',
      date: Date.now(),
      accounts: [
        { id: '0abcd', value: 105400, note: '갸아악' },
        { id: '0cdef', value: -236789, note: '그아악' },
      ],
      summary: '버튼 잘못 눌러서 돈 나감',
    };
    // Apply accountSchema to entrySchema - 'flatten' it.
    return (
      <div>
        <BookDateEntry date={Date.now()}>
          <li>
            <BookEntry entry={Object.assign({}, entrySchema, {
              accounts: entrySchema.accounts.map(info => Object.assign({},
                info, { account: accountSchema[info.id] })),
            })} focus />
          </li>
          <li>
            <BookEntry entry={Object.assign({}, entrySchema, {
              accounts: entrySchema.accounts.map(info => Object.assign({},
                info, { account: accountSchema[info.id] })),
            })} />
          </li>
        </BookDateEntry>
      </div>
    );
  }
}
