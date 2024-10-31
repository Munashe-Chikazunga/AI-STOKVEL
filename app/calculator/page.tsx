'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calculator, Info } from 'lucide-react';
import { InvestmentCalculator } from '@/components/calculator/investment-calculator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Investment Calculator</h1>
        </div>
        <p className="text-muted-foreground">
          Calculate your potential returns based on investment duration and amount
        </p>
      </div>

      <Card className="mx-auto max-w-4xl p-6">
        <div className="mb-6 rounded-lg bg-primary/10 p-4">
          <div className="flex items-start gap-2">
            <Info className="mt-1 h-5 w-5 text-primary" />
            <div className="space-y-2 text-sm">
              <p>
                <strong>Investment Tiers:</strong>
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Short-term (1-2 weeks): 2% weekly return</li>
                <li>Medium-term (3-6 weeks): 4% weekly return</li>
                <li>Long-term (7-12 weeks): 5% weekly return</li>
              </ul>
            </div>
          </div>
        </div>

        <InvestmentCalculator />
      </Card>
    </div>
  );
}