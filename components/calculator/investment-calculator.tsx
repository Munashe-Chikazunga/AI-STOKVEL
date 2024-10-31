'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

const MAX_INVESTMENT = 1000000; // R1,000,000 maximum investment

function calculateReturns(principal: number, weeks: number) {
  const getRate = (week: number) => {
    if (week <= 2) return 0.02;
    if (week <= 6) return 0.04;
    return 0.05;
  };

  return Array.from({ length: weeks }, (_, i) => {
    const week = i + 1;
    const rate = getRate(week);
    const amount = principal * Math.pow(1 + rate, week);
    return {
      week,
      amount: Math.round(amount * 100) / 100,
    };
  });
}

export function InvestmentCalculator() {
  const [amount, setAmount] = useState<string>('1000');
  const [weeks, setWeeks] = useState<number>(4);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    if (numericAmount > 0 && weeks > 0) {
      // Calculate returns for all three tiers up to the selected number of weeks
      const data = Array.from({ length: weeks }, (_, i) => {
        const week = i + 1;
        const shortTermAmount = week <= 2 ? calculateReturns(numericAmount, week)[week - 1].amount : null;
        const mediumTermAmount = week <= 6 ? numericAmount * Math.pow(1.04, week) : null;
        const longTermAmount = numericAmount * Math.pow(1.05, week);

        return {
          week,
          'Short-term (2%)': shortTermAmount,
          'Medium-term (4%)': mediumTermAmount,
          'Long-term (5%)': longTermAmount,
        };
      });
      setChartData(data);
    }
  }, [amount, weeks]);

  const numericAmount = parseFloat(amount) || 0;
  const finalAmount = chartData[chartData.length - 1]?.['Long-term (5%)'] || numericAmount;
  const totalReturn = finalAmount - numericAmount;
  const returnPercentage = (totalReturn / numericAmount) * 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="amount">Investment Amount (R)</Label>
          <Input
            id="amount"
            type="number"
            min="100"
            max={MAX_INVESTMENT}
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (!value || parseFloat(value) <= MAX_INVESTMENT) {
                setAmount(value);
              }
            }}
            className="mt-2"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum investment: R{MAX_INVESTMENT.toLocaleString()}
          </p>
        </div>

        <div>
          <Label htmlFor="duration">Investment Duration</Label>
          <Select
            value={weeks.toString()}
            onValueChange={(value) => setWeeks(Number(value))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Week</SelectItem>
              <SelectItem value="2">2 Weeks</SelectItem>
              <SelectItem value="4">4 Weeks</SelectItem>
              <SelectItem value="6">6 Weeks</SelectItem>
              <SelectItem value="8">8 Weeks</SelectItem>
              <SelectItem value="12">12 Weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Final Amount</p>
          <p className="mt-1 text-2xl font-bold">
            R{finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Return</p>
          <p className="mt-1 text-2xl font-bold">
            R{totalReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Return Percentage</p>
          <p className="mt-1 text-2xl font-bold">
            {returnPercentage.toFixed(2)}%
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Investment Growth Comparison</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                label={{
                  value: 'Weeks',
                  position: 'insideBottom',
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: 'Amount (R)',
                  angle: -90,
                  position: 'insideLeft',
                }}
                tickFormatter={(value) =>
                  `R${value.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}`
                }
              />
              <Tooltip
                formatter={(value: number) =>
                  `R${value.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Short-term (2%)"
                stroke="#ff0000"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Medium-term (4%)"
                stroke="#00ff00"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Long-term (5%)"
                stroke="#0000ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}