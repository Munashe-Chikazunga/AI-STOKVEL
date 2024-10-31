'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TransactionList } from '@/components/transactions/transaction-list';
import { TransactionFilters } from '@/components/transactions/transaction-filters';
import { NewTransactionButton } from '@/components/transactions/new-transaction-button';
import { Card } from '@/components/ui/card';

export default function TransactionsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate auth check - replace with your actual auth check
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAuthenticated(false); // Set to true when user is authenticated
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your transaction history
          </p>
        </div>
        <NewTransactionButton />
      </div>

      <Card className="p-6">
        <TransactionFilters
          filter={filter}
          sortBy={sortBy}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
        />
        <TransactionList filter={filter} sortBy={sortBy} />
      </Card>
    </div>
  );
}