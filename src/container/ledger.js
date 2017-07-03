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
      entries: Array.from({ length: 5 }).map(() => ({
        id: '01234567',
        date: Date.now(),
        accounts: [
          { id: '0abcd', value: 105400, note: '갸아악' },
          { id: '0cdef', value: -236789, note: '' },
        ],
        summary: '버튼 잘못 눌러서 돈 나감',
      })),
      accounts: {
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
      },
      selectedId: -1,
      selectedActive: false,
      // Maybe we need to use immutable.js?
      editingIds: {},
    };
  }
  handleEntryChange(value) {
    this.setState({ entry: value });
  }
  handleEntryStatus(id, edited) {
    const { selectedId, editingIds } = this.state;
    if (selectedId !== id && !edited) {
      // Remove itself from editingIds
      // TODO Actually remove it
      this.setState({
        editingIds: Object.assign({}, editingIds, {
          [id]: null,
        }),
      });
    }
    if (selectedId === id) {
      this.setState({ selectedActive: edited });
    }
  }
  handleEntrySelect(id) {
    const { selectedId, selectedActive, editingIds } = this.state;
    if (id === selectedId) return;
    this.setState({
      selectedId: id,
      selectedActive: false,
      editingIds: Object.assign({}, editingIds, {
        [id]: true,
        [selectedId]: selectedActive,
      }),
    });
  }
  render() {
    const { accounts, entries, selectedId, editingIds } = this.state;
    const renderAccountList = (account, onSelect) => (
      <SearchBox selectedId={account.id}
        onSelect={onSelect}
        data={Object.keys(accounts).map(v => accounts[v])} />
    );
    return (
      <div className={style.ledger}>
        <BookDateEntry date={Date.now()}>
          { entries.map((v, i) => (
            <li key={i}>
              <CachedForm
                onChange={this.handleEntryChange.bind(this, i)}
                onStatus={this.handleEntryStatus.bind(this, i)}
                value={Object.assign({}, v, {
                  accounts: v.accounts.map(info => Object.assign({},
                    info, { account: accounts[info.id] })),
                })}
              >
                <BookEntry
                  focus={i === selectedId}
                  editing={editingIds[i]}
                  onSelect={this.handleEntrySelect.bind(this, i)}
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
