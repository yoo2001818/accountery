import { Account, Transaction } from '../types';

export const accounts: Account[] = [
  {
    id: '0',
    type: 'asset',
    name: '현금',
  },
  {
    id: '1',
    type: 'asset',
    name: '보통예금',
  },
  {
    id: '2',
    type: 'income',
    name: '잡이익',
  },
  {
    id: '3',
    type: 'expense',
    name: '잡비',
  },
];

export const ledger: Transaction[] = [
  {
    id: '0',
    comment: '비용',
    date: '2019-12-30T00:00:00Z',
    createdAt: '2019-12-30T00:00:00Z',
    updatedAt: '2019-12-30T00:00:00Z',
    entries: [
      {
        accountId: '0',
        type: 'credit',
        amount: 12000,
        comment: '',
      },
      {
        accountId: '3',
        type: 'debit',
        amount: 12000,
        comment: '',
      },
    ],
  },
  {
    id: '1',
    comment: '이익',
    date: '2019-12-30T00:00:00Z',
    createdAt: '2019-12-30T00:00:00Z',
    updatedAt: '2019-12-30T00:00:00Z',
    entries: [
      {
        accountId: '0',
        type: 'debit',
        amount: 10000,
        comment: '',
      },
      {
        accountId: '2',
        type: 'credit',
        amount: 10000,
        comment: '',
      },
    ],
  },
];
