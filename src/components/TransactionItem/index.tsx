import React from 'react';
import { Transaction } from '../../types';

export interface TransactionItemProps {
  transaction: Transaction,
}

export default function TransactionItem(props: TransactionItemProps) {
  const { transaction } = props;
  return (
    <div>Transaction</div>
  );
}
