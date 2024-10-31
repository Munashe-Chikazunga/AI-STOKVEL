import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail, MessageCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Support Center</h1>
        <p className="text-muted-foreground">
          Need help? We're here to assist you with any questions or concerns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Live Chat Support
            </CardTitle>
            <CardDescription>
              Chat with our support team in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Support
            </CardTitle>
            <CardDescription>
              Send us an email and we'll respond within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              support@aistokevel.com
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">How do I get started?</h3>
              <p className="text-sm text-muted-foreground">
                Sign up for an account, complete verification, and you can start trading immediately.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">What are the trading fees?</h3>
              <p className="text-sm text-muted-foreground">
                We maintain competitive fees starting at 0.1% per transaction.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">How secure is my investment?</h3>
              <p className="text-sm text-muted-foreground">
                We employ industry-leading security measures and store assets in secure wallets.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}