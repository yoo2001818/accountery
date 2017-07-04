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
      formStates: {},
    };
  }
  handleEntryChange(id, value) {
    const { entries } = this.state;
    this.setState({
      entries: entries.map((v, i) => i === id ? value : v),
    });
  }
  handleEntryState(id, state) {
    const { formStates } = this.state;
    this.setState({
      formStates: Object.assign({}, formStates, {
        [id]: Object.assign({}, formStates[id], state),
      }),
    });
  }
  handleEntrySelect(id) {
    const { selectedId, formStates } = this.state;
    if (id === selectedId) return;
    this.setState({
      selectedId: id,
      formStates: Object.assign({}, formStates, {
        [id]: Object.assign({}, formStates[id],
          { editing: true }),
        [selectedId]: Object.assign({}, formStates[selectedId],
          { editing: (formStates[selectedId] || {}).edited }),
      }),
    });
  }
  render() {
    const { accounts, entries, selectedId, formStates } = this.state;
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
                onState={this.handleEntryState.bind(this, i)}
                onChange={this.handleEntryChange.bind(this, i)}
                value={Object.assign({}, v, {
                  accounts: v.accounts.map(info => Object.assign({},
                    info, { account: accounts[info.id] })),
                })}
                state={formStates[i]}
              >
                <BookEntry
                  focus={i === selectedId}
                  editing={(formStates[i] || {}).editing}
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
