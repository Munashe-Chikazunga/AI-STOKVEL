'use client';

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const transactions = [
  {
    id: 1,
    date: '2024-03-10',
    type: 'deposit',
    amount: 500.0,
    status: 'completed',
    description: 'Monthly deposit',
  },
  {
    id: 2,
    date: '2024-03-09',
    type: 'withdrawal',
    amount: 100.0,
    status: 'completed',
    description: 'ATM withdrawal',
  },
  {
    id: 3,
    date: '2024-03-08',
    type: 'transfer',
    amount: 250.0,
    status: 'pending',
    description: 'Transfer to John',
  },
];

interface TransactionListProps {
  filter: string;
  sortBy: string;
}

export function TransactionList({ filter, sortBy }: TransactionListProps) {
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className="flex items-center gap-2">
              {transaction.type === 'deposit' ? (
                <ArrowDownIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowUpIcon className="h-4 w-4 text-red-500" />
              )}
              {transaction.type}
            </TableCell>
            <TableCell
              className={cn(
                'font-medium',
                transaction.type === 'deposit'
                  ? 'text-green-500'
                  : 'text-red-500'
              )}
            >
              ${transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  'rounded-full px-2 py-1 text-xs font-medium',
                  transaction.status === 'completed'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                )}
              >
                {transaction.status}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {transaction.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}