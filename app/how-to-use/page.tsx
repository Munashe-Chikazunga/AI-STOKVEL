'use client';

import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calculator, Clock, Gift, Wallet } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Growth Rates',
    description: 'Earn up to 5% weekly returns on your investments.',
    details: [
      '2% weekly returns for 1-2 weeks',
      '4% weekly returns for 3-6 weeks',
      '5% weekly returns for 7-12 weeks',
    ],
  },
  {
    icon: Clock,
    title: 'Investment Period',
    description: 'Choose your investment duration for optimal returns.',
    details: [
      'Short-term: 1-2 weeks',
      'Medium-term: 3-6 weeks',
      'Long-term: 7-12 weeks (best returns)',
    ],
  },
  {
    icon: Gift,
    title: 'Referral Rewards',
    description: 'Earn bonuses by inviting others.',
    details: [
      '5% bonus on first referral',
      '10% increased returns after 5 referrals',
      'Special bonuses for 10+ referrals',
    ],
  },
  {
    icon: Wallet,
    title: 'Investment Limits',
    description: 'Structured investment tiers for optimal growth.',
    details: [
      'Minimum investment period: 1 week',
      'Returns are automatically compounded',
      'Withdrawals available after minimum period',
    ],
  },
];

export default function HowToUsePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">How to Use</h1>
        <p className="text-muted-foreground">
          Learn how to maximize your returns with our platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{feature.title}</h2>
              </div>
              <p className="mb-4 text-muted-foreground">
                {feature.description}
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value="details">
                  <AccordionTrigger>View Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-6 list-disc space-y-2">
                      {feature.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          );
        })}
      </div>
    </div>
  );
}