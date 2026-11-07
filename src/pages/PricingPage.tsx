import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, ArrowRight, HelpCircle, Shield, Sparkles } from 'lucide-react';
import { PRICING_PLANS, BillingCycle, calculateEffectiveMonthlyPrice, calculateAnnualSavings } from '../utils/pricing';

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');

  const comparisonCategories = [
    {
      name: 'Capacity & Ingestion',
      features: [
        { name: 'Monthly Ingested Events', starter: '50,000', pro: '1,000,000', enterprise: 'Custom / Unlimited' },
        { name: 'Active Workspaces', starter: '1', pro: '5', enterprise: 'Unlimited' },
        { name: 'Team Member Seats', starter: '3', pro: '15', enterprise: 'Unlimited' },
        { name: 'Cold Data Retention', starter: '7 days', pro: '90 days', enterprise: '365+ days' },
        { name: 'Global Edge Ingestion Points', starter: '3 regions', pro: '12 regions', enterprise: 'All edge regions' }
      ]
    },
    {
      name: 'Analytics & Dashboards',
      features: [
        { name: 'Real-Time Revenue Analytics', starter: true, pro: true, enterprise: true },
        { name: 'Live Pipeline Telemetry', starter: true, pro: true, enterprise: true },
        { name: 'Predictive Cohort Analysis', starter: false, pro: true, enterprise: true },
        { name: 'Custom Alert Webhooks', starter: 'Up to 3', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Scheduled CSV/PDF Reports', starter: false, pro: true, enterprise: true }
      ]
    },
    {
      name: 'Security & Compliance',
      features: [
        { name: 'Two-Factor Authentication (2FA)', starter: true, pro: true, enterprise: true },
        { name: 'Role-Based Access Control (RBAC)', starter: false, pro: true, enterprise: true },
        { name: 'SAML 2.0 / Okta SSO', starter: false, pro: false, enterprise: true },
        { name: 'SOC 2 Type II Certified', starter: true, pro: true, enterprise: true },
        { name: 'HIPAA BAA Guarantee', starter: false, pro: false, enterprise: true },
        { name: 'Self-Hosted VPC Deployment', starter: false, pro: false, enterprise: true }
      ]
    },
    {
      name: 'Support & SLAs',
      features: [
        { name: 'Support Channel', starter: 'Community & Email', pro: '24/7 Slack & Email', enterprise: 'Dedicated CSM & Phone' },
        { name: 'Uptime SLA', starter: '99.9%', pro: '99.95%', enterprise: '99.99% Financially backed' },
        { name: 'Initial Architecture Review', starter: false, pro: false, enterprise: true }
      ]
    }
  ];

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
            <span>Pricing Architecture</span>
            <span>·</span>
            <span>No Hidden Surcharges</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Predictable plans designed to scale with your platform.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            All plans include full API access, live dashboard telemetry, and enterprise SSL encryption. No surprise egress taxes.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {PRICING_PLANS.map(plan => {
            const effectivePrice = calculateEffectiveMonthlyPrice(plan, billingCycle);
            const savings = calculateAnnualSavings(plan);

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  plan.highlighted
                    ? 'bg-white dark:bg-[#111827] border-2 border-violet-600 dark:border-violet-500 shadow-xl shadow-violet-500/10'
                    : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-600 text-white text-[11px] font-semibold tracking-wide shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h2>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{plan.specs.workspaces}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[38px]">
                    {plan.tagline}
                  </p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                        ${effectivePrice}
                      </span>
                      <span className="text-xs text-slate-500">/ seat / month</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-mono font-medium">
                        Billed annually (${plan.yearlyPricePerMonth * 12}/yr) · Save ${savings}/yr
                      </div>
                    )}
                  </div>

                  {/* Plan Specs Strip */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-6 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Volume:</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200 font-mono">{plan.specs.eventsPerMonth}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Retention:</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200 font-mono">{plan.specs.retention}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Support:</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">{plan.specs.support}</span>
                    </div>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                      Included Features
                    </div>
                    {plan.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to={plan.id === 'enterprise' ? '/contact' : '/dashboard'}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      plan.highlighted
                        ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20'
                        : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Feature Comparison Matrix */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Comprehensive Feature Comparison
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Detailed specifications and capacity limits for each subscription tier.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold w-1/3">Features & Capabilities</th>
                  <th className="py-3 px-4 font-semibold text-center w-1/5">Starter</th>
                  <th className="py-3 px-4 font-semibold text-center text-violet-600 dark:text-violet-400 w-1/5">Professional</th>
                  <th className="py-3 px-4 font-semibold text-center w-1/5">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((category, cidx) => (
                  <React.Fragment key={cidx}>
                    <tr className="bg-slate-50 dark:bg-slate-900/40">
                      <td colSpan={4} className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                        {category.name}
                      </td>
                    </tr>
                    {category.features.map((feat, fidx) => (
                      <tr key={fidx} className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          {feat.name}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof feat.starter === 'boolean' ? (
                            feat.starter ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <span className="text-slate-300 dark:text-slate-700">—</span>
                            )
                          ) : (
                            <span className="font-mono text-slate-700 dark:text-slate-300">{feat.starter}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-violet-50/20 dark:bg-violet-950/10">
                          {typeof feat.pro === 'boolean' ? (
                            feat.pro ? (
                              <Check className="w-4 h-4 text-violet-600 dark:text-violet-400 mx-auto" />
                            ) : (
                              <span className="text-slate-300 dark:text-slate-700">—</span>
                            )
                          ) : (
                            <span className="font-mono font-semibold text-violet-600 dark:text-violet-400">{feat.pro}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {typeof feat.enterprise === 'boolean' ? (
                            feat.enterprise ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <span className="text-slate-300 dark:text-slate-700">—</span>
                            )
                          ) : (
                            <span className="font-mono text-slate-700 dark:text-slate-300">{feat.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise Callout */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-violet-900 to-slate-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold">Need custom compliance or on-premise VPC deployment?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our infrastructure solutions architects work directly with your security and platform engineering teams to configure bespoke data residency rules.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs whitespace-nowrap shrink-0 transition-all shadow"
          >
            Schedule Security Architecture Call
          </Link>
        </div>

      </div>
    </div>
  );
}
