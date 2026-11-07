export type TimeRange = '7D' | '30D' | '90D' | '1Y';

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  expenses: number;
  users: number;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  rawNumeric: number;
  change: string;
  isPositive: boolean;
  benchmark: string;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num}`;
}

export const REVENUE_DATA_SERIES: Record<TimeRange, RevenueDataPoint[]> = {
  '7D': [
    { date: 'Mon', revenue: 14200, expenses: 4300, users: 310 },
    { date: 'Tue', revenue: 16800, expenses: 4500, users: 345 },
    { date: 'Wed', revenue: 15400, expenses: 4200, users: 330 },
    { date: 'Thu', revenue: 18900, expenses: 4800, users: 410 },
    { date: 'Fri', revenue: 21500, expenses: 5100, users: 480 },
    { date: 'Sat', revenue: 19800, expenses: 4600, users: 430 },
    { date: 'Sun', revenue: 23400, expenses: 4900, users: 512 }
  ],
  '30D': [
    { date: 'Week 1', revenue: 78500, expenses: 22100, users: 1840 },
    { date: 'Week 2', revenue: 92400, expenses: 24300, users: 2150 },
    { date: 'Week 3', revenue: 104200, expenses: 26800, users: 2490 },
    { date: 'Week 4', revenue: 124800, expenses: 29400, users: 2980 }
  ],
  '90D': [
    { date: 'Month 1', revenue: 284000, expenses: 74000, users: 7200 },
    { date: 'Month 2', revenue: 342000, expenses: 81000, users: 8900 },
    { date: 'Month 3', revenue: 412500, expenses: 92000, users: 11400 }
  ],
  '1Y': [
    { date: 'Q1', revenue: 640000, expenses: 180000, users: 14200 },
    { date: 'Q2', revenue: 890000, expenses: 210000, users: 21000 },
    { date: 'Q3', revenue: 1150000, expenses: 260000, users: 29500 },
    { date: 'Q4', revenue: 1480000, expenses: 310000, users: 38200 }
  ]
};

export function calculateSummaryMetrics(timeRange: TimeRange) {
  const points = REVENUE_DATA_SERIES[timeRange];
  const totalRevenue = points.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = points.reduce((acc, curr) => acc + curr.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const marginPercent = Math.round((netProfit / totalRevenue) * 100);

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    marginPercent
  };
}
