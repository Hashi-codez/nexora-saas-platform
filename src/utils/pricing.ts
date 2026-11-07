export type BillingCycle = 'monthly' | 'yearly';

export interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPricePerMonth: number;
  highlighted: boolean;
  ctaText: string;
  features: string[];
  specs: {
    workspaces: string;
    eventsPerMonth: string;
    retention: string;
    support: string;
  };
}

export const PRICING_PLANS: PlanTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Ideal for early-stage teams & indie builders launching fast.',
    monthlyPrice: 29,
    yearlyPricePerMonth: 22,
    highlighted: false,
    ctaText: 'Start 14-Day Free Trial',
    features: [
      'Up to 3 team members',
      '50,000 monthly events',
      '7-day data retention',
      'Community & email support',
      'Core analytics & metrics dashboard',
      'Standard webhook triggers'
    ],
    specs: {
      workspaces: '1 Workspace',
      eventsPerMonth: '50K events/mo',
      retention: '7-day retention',
      support: 'Standard email'
    }
  },
  {
    id: 'pro',
    name: 'Professional',
    badge: 'Most Popular',
    tagline: 'For fast-growing companies that demand real-time data & pipelines.',
    monthlyPrice: 79,
    yearlyPricePerMonth: 59,
    highlighted: true,
    ctaText: 'Start 14-Day Free Trial',
    features: [
      'Up to 15 team members',
      '1,000,000 monthly events',
      '90-day data retention',
      'Priority 24/7 Slack & email support',
      'Advanced predictive cohort analysis',
      'Custom webhook triggers & API access',
      'Role-based access control (RBAC)',
      'Automated pipeline alerts & webhooks'
    ],
    specs: {
      workspaces: '5 Workspaces',
      eventsPerMonth: '1M events/mo',
      retention: '90-day retention',
      support: 'Priority 24/7'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Dedicated infrastructure, custom SLAs, and custom compliance.',
    monthlyPrice: 199,
    yearlyPricePerMonth: 159,
    highlighted: false,
    ctaText: 'Talk to Enterprise Team',
    features: [
      'Unlimited team members',
      'Unlimited monthly events',
      '365-day cold data retention',
      'Dedicated Customer Success Manager',
      '99.99% uptime SLA guarantee',
      'SOC2 Type II, HIPAA & GDPR compliance',
      'Custom SSO (SAML, Okta, Google)',
      'Custom on-premise or VPC deployment'
    ],
    specs: {
      workspaces: 'Unlimited Workspaces',
      eventsPerMonth: 'Custom scale',
      retention: '365-day retention',
      support: 'Dedicated CSM & SLA'
    }
  }
];

export function calculateEffectiveMonthlyPrice(plan: PlanTier, cycle: BillingCycle): number {
  return cycle === 'yearly' ? plan.yearlyPricePerMonth : plan.monthlyPrice;
}

export function calculateAnnualCost(plan: PlanTier, cycle: BillingCycle): number {
  if (cycle === 'yearly') {
    return plan.yearlyPricePerMonth * 12;
  }
  return plan.monthlyPrice * 12;
}

export function calculateAnnualSavings(plan: PlanTier): number {
  const fullMonthlyForYear = plan.monthlyPrice * 12;
  const discountedYearly = plan.yearlyPricePerMonth * 12;
  return fullMonthlyForYear - discountedYearly;
}

export function getSavingsPercent(plan: PlanTier): number {
  const fullMonthlyForYear = plan.monthlyPrice * 12;
  const savings = calculateAnnualSavings(plan);
  return Math.round((savings / fullMonthlyForYear) * 100);
}
