'use client';

// Mock real-time data with realistic values
const mockData = {
  stats: {
    balance: 25000,
    activeUsers: 1234,
    volume: 50000,
    growth: '15%',
  },
  activity: [
    { date: '2024-03-01', users: 100 },
    { date: '2024-03-02', users: 120 },
    { date: '2024-03-03', users: 150 },
    { date: '2024-03-04', users: 180 },
    { date: '2024-03-05', users: 200 },
    { date: '2024-03-06', users: 220 },
    { date: '2024-03-07', users: 250 },
  ],
  volume: [
    { date: '2024-03-01', volume: 10000 },
    { date: '2024-03-02', volume: 15000 },
    { date: '2024-03-03', volume: 12000 },
    { date: '2024-03-04', volume: 18000 },
    { date: '2024-03-05', volume: 20000 },
    { date: '2024-03-06', volume: 22000 },
    { date: '2024-03-07', volume: 25000 },
  ],
};

// Function to generate random variations in data
function generateVariation(baseValue: number, maxVariation: number = 0.1): number {
  const variation = (Math.random() - 0.5) * 2 * maxVariation;
  return Math.round(baseValue * (1 + variation));
}

class RealTimeData {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize with mock data
      this.setupMockData();
    }
  }

  private setupMockData() {
    this.mockData = JSON.parse(JSON.stringify(mockData));
  }

  private mockData: typeof mockData;

  private updateMockData() {
    // Update stats with variations
    this.mockData.stats = {
      balance: generateVariation(mockData.stats.balance),
      activeUsers: generateVariation(mockData.stats.activeUsers),
      volume: generateVariation(mockData.stats.volume),
      growth: `${generateVariation(15, 0.2)}%`,
    };

    // Update activity and volume with new data points
    const lastDate = new Date();
    this.mockData.activity = this.mockData.activity.slice(1);
    this.mockData.activity.push({
      date: lastDate.toISOString().split('T')[0],
      users: generateVariation(this.mockData.activity[5].users),
    });

    this.mockData.volume = this.mockData.volume.slice(1);
    this.mockData.volume.push({
      date: lastDate.toISOString().split('T')[0],
      volume: generateVariation(this.mockData.volume[5].volume),
    });
  }

  subscribe(type: string, listener: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);

    // Send initial data
    setTimeout(() => {
      listener(this.mockData[type as keyof typeof mockData]);
    }, 500);

    // Set up interval for updates
    if (!this.intervals.has(type)) {
      const interval = setInterval(() => {
        this.updateMockData();
        this.listeners.get(type)?.forEach(l => 
          l(this.mockData[type as keyof typeof mockData])
        );
      }, 30000);
      this.intervals.set(type, interval);
    }

    return () => {
      this.listeners.get(type)?.delete(listener);
      if (this.listeners.get(type)?.size === 0) {
        const interval = this.intervals.get(type);
        if (interval) {
          clearInterval(interval);
          this.intervals.delete(type);
        }
      }
    };
  }
}

export const realTimeData = new RealTimeData();