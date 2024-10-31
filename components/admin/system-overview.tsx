'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity, TrendingUp, Users, Wallet } from 'lucide-react';

const data = [
  { name: 'Jan', users: 400, transactions: 240 },
  { name: 'Feb', users: 300, transactions: 139 },
  { name: 'Mar', users: 200, transactions: 980 },
  { name: 'Apr', users: 278, transactions: 390 },
  { name: 'May', users: 189, transactions: 480 },
  { name: 'Jun', users: 239, transactions: 380 },
];

const stats = [
  {
    title: 'Total Users',
    value: '3,120',
    icon: Users,
    change: '+12%',
  },
  {
    title: 'Active Investments',
    value: 'R2.4M',
    icon: Wallet,
    change: '+8.1%',
  },
  {
    title: 'Transaction Volume',
    value: 'R850K',
    icon: Activity,
    change: '+6.5%',
  },
  {
    title: 'Growth Rate',
    value: '18.2%',
    icon: TrendingUp,
    change: '+2.3%',
  },
];

export function SystemOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last
                  month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  name="New Users"
                />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="#82ca9d"
                  name="Transactions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}