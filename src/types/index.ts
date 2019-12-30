export type UUID = string;
export type ISO8601 = string;

export interface Transaction {
  id: UUID,
  comment: string,
  date: ISO8601,
  entries: TransactionEntry[],
  createdAt: ISO8601,
  updatedAt: ISO8601,
}

export interface TransactionEntry {
  accountId: UUID,
  type: 'credit' | 'debit',
  amount: number,
  comment: string,
}

export interface Account {
  id: UUID,
  type: 'asset' | 'liability' | 'income' | 'expense' | 'equity',
  name: string,
}
