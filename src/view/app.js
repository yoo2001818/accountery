import React, { Component } from 'react';

import style from './app.css';

import BookDateEntry from '../component/bookDateEntry';
import BookEntry from '../component/bookEntry';

export default class App extends Component {
  render() {
    const entrySchema = {
      id: '01234567',
      date: new Date(),
      accounts: [
        { id: '0abcd', price: 105400, note: '갸아악' },
        { id: '0cdef', price: -105400, note: '그아악' },
      ],
      summary: '버튼 잘못 눌러서 돈 나감',
    };
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
    return (
      <div className={style.app}>
        <BookDateEntry date={new Date()}>
          <BookEntry />
        </BookDateEntry>
      </div>
    );
  }
}
