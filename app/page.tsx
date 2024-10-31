import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BarChart3, Shield, Wallet } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-primary/10 to-background px-4 py-16">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to AI Stokvel
          </h1>
          <p className="mt-4 max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
            Join our community-driven investment platform. Start growing your wealth today with smart, secure, and transparent investments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/auth">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-to-use">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6">
            <Shield className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-bold">Secure Platform</h3>
            <p className="text-muted-foreground">
              Your investments are protected with enterprise-grade security measures.
            </p>
          </Card>
          <Card className="p-6">
            <Wallet className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-bold">Smart Investments</h3>
            <p className="text-muted-foreground">
              Access a range of investment options tailored to your goals.
            </p>
          </Card>
          <Card className="p-6">
            <BarChart3 className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-bold">Real-time Analytics</h3>
            <p className="text-muted-foreground">
              Track your investments with advanced analytics and insights.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}