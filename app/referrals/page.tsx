'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Users } from 'lucide-react';

export default function ReferralsPage() {
  const { toast } = useToast();
  const referralLink = 'https://aistokvel.com/ref/123456';
  const referralCount = 3;
  const nextMilestone = 5;
  const progress = (referralCount / nextMilestone) * 100;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Referral link copied',
      description: 'The referral link has been copied to your clipboard.',
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Referral Program</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <code className="flex-1 p-2 bg-muted rounded">{referralLink}</code>
              <Button variant="outline" size="icon" onClick={copyReferralLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link with friends to earn rewards
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Referral Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {referralCount} referrals
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Next milestone: {nextMilestone}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {nextMilestone - referralCount} more referrals until your next reward
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rewards Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">First Referral</h4>
                  <p className="text-sm text-muted-foreground">
                    5% bonus on next investment
                  </p>
                </div>
                <Button variant="outline" disabled={referralCount < 1}>
                  {referralCount >= 1 ? 'Claimed' : 'Pending'}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">5 Referrals</h4>
                  <p className="text-sm text-muted-foreground">
                    10% increased returns for one week
                  </p>
                </div>
                <Button variant="outline" disabled={referralCount < 5}>
                  {referralCount >= 5 ? 'Claim' : 'Pending'}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">10 Referrals</h4>
                  <p className="text-sm text-muted-foreground">
                    Free investment bonus
                  </p>
                </div>
                <Button variant="outline" disabled={referralCount < 10}>
                  {referralCount >= 10 ? 'Claim' : 'Pending'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}