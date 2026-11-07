import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, CheckCircle2, ChevronDown, 
  Zap, Shield, BarChart3, Globe, Cpu, RefreshCw, 
  Database, Users, Lock, Sparkles, Server
} from 'lucide-react';
import { ASSETS, TESTIMONIALS, FAQ_ITEMS } from '../data/mockData';
import { PRICING_PLANS, BillingCycle, calculateEffectiveMonthlyPrice, calculateAnnualSavings } from '../utils/pricing';
import { VideoModal } from '../components/VideoModal';

export function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [previewTab, setPreviewTab] = useState<'metrics' | 'pipeline' | 'clusters'>('metrics');

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
        {/* Subtle background ambient glow (not neon or excessive) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-500/10 dark:bg-violet-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Clean metadata kicker (No candy pills) */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-600 dark:text-violet-400">
              <span>Nexora Enterprise 2.4</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>Sub-15ms Real-Time Event Pipeline</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>SOC2 Certified</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              The real-time intelligence platform built for modern engineering teams.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Ingest, normalize, and visualize high-concurrency event telemetry in sub-seconds. Consolidate fragmented dashboards into one high-performance command center.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-violet-600 text-white font-semibold text-sm hover:bg-slate-800 dark:hover:bg-violet-700 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all"
              >
                <span>Launch Live Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-sm"
              >
                <Play className="w-4 h-4 text-violet-600 dark:text-violet-400 fill-current" />
                <span>Watch Product Demo</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                14-day full access trial
              </span>
              <span className="flex items-center gap-1.5 hidden sm:inline-flex">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Zero setup time
              </span>
            </div>
          </div>

          {/* Interactive Product Dashboard Preview Window */}
          <div className="mt-12 lg:mt-16 relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-2 sm:p-3 shadow-2xl transition-all">
              {/* Window chrome header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">nexora.cloud/prod/overview</span>
                </div>
                {/* Interactive preview tabs */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                  <button
                    onClick={() => setPreviewTab('metrics')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      previewTab === 'metrics'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Metrics & ARR
                  </button>
                  <button
                    onClick={() => setPreviewTab('pipeline')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      previewTab === 'pipeline'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Live Pipeline
                  </button>
                  <button
                    onClick={() => setPreviewTab('clusters')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      previewTab === 'clusters'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Global Regions
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-950">
                <img
                  src={previewTab === 'pipeline' ? ASSETS.featurePipeline : ASSETS.heroDashboard}
                  alt="Nexora Platform Dashboard Interface Preview"
                  className="w-full h-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Interactive Hotspot / Overlay Banner */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-3.5 text-white shadow-lg">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-violet-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Live Sandbox Active
                    </span>
                    <span className="font-mono text-emerald-400 tabular-nums">99.99% Nominal</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {previewTab === 'metrics' && 'Interactive financial telemetry with real-time revenue cohort tracking.'}
                    {previewTab === 'pipeline' && 'Event streaming ingestion pipeline processing 140,000+ payload updates per second.'}
                    {previewTab === 'clusters' && 'Multi-region mesh synced across US-East, EU-Central, and AP-South with failover.'}
                  </p>
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Want to test live operations?</span>
                    <Link to="/dashboard" className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1">
                      Explore Console <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Logos */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
              Trusted by high-velocity platform engineering teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-sm tracking-widest text-slate-700 dark:text-slate-300">CLOUDSCALE</span>
              <span className="font-bold text-sm tracking-widest text-slate-700 dark:text-slate-300">VERCELIO</span>
              <span className="font-bold text-sm tracking-widest text-slate-700 dark:text-slate-300">DATASYNC</span>
              <span className="font-bold text-sm tracking-widest text-slate-700 dark:text-slate-300">HYPERSTREAM</span>
              <span className="font-bold text-sm tracking-widest text-slate-700 dark:text-slate-300">NEURALOPS</span>
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Section with Tabular Numbers */}
      <section className="py-14 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                $4.2B+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Annual Transaction Volume
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                &lt;12ms
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Global Edge Query Latency
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                14.8M+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Daily Pipeline Events
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                99.99%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Enterprise Uptime SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
              Capabilities Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Built for speed, clarity, and mission-critical reliability.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Every layer of Nexora is optimized for high-throughput concurrency and intuitive operational management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: 2-column span with visual asset */}
            <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-3 z-10 max-w-md">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Automated Event Pipelines & Micro-Transformations
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Route incoming webhook data through programmable filters and state enrichment triggers with sub-millisecond dispatch time.
                </p>
                <div className="pt-2">
                  <Link to="/features" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
                    Explore Pipeline Engine <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 aspect-[16/9] bg-slate-900">
                <img
                  src={ASSETS.featurePipeline}
                  alt="Nexora Automated Pipeline Visualization"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Card 2: Single Column Security & Compliance */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Enterprise Security & Granular RBAC
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enforce strict cryptographic isolation, role-based privileges, SAML SSO, and SOC2 audit trails natively.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">SOC2 Type II</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">HIPAA BAA</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Data Encryption</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200 font-mono">AES-256 GCM</span>
                </div>
              </div>
            </div>

            {/* Card 3: Real-Time Observability */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Predictive Cohort & Revenue Analytics
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Correlate application traffic spikes with customer expansion, churn risk, and net ARR realization in real time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Live aggregation across 4 distinct dimensions with zero query delays.
              </div>
            </div>

            {/* Card 4: Global Edge Mesh */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Distributed Edge Ingestion Mesh
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Global edge workers route requests to the nearest computational cluster, preventing regional cross-ocean bottlenecks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                12 edge POPs with automated TCP anycast failover.
              </div>
            </div>

            {/* Card 5: Developer Ergonomics */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Developer First APIs & SDKs
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Idiomatic libraries for TypeScript, Python, and Go with typed interfaces and automatic retry buffers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono">
                npm install @nexora/client
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section (Human editorial numbering) */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
              Simple Integration
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              From raw telemetry to live intelligence in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-400">01.</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Connect Data Ingestion</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Send payloads via lightweight HTTP endpoints, OpenTelemetry agents, or our prebuilt connectors for Stripe, Segment, and AWS SQS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-400">02.</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Define Streaming Rules</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Configure declarative aggregation schemas, anomaly alerts, and dynamic cohort metrics without writing brittle SQL batch queries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-400">03.</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Act on Real-Time Clarity</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Share unified dashboards across engineering and leadership teams to make data-backed operational adjustments instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials with Authentic Portraits */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
              Verified Production Impact
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Engineers and leaders rely on Nexora daily
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-8 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.author}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.role} · {item.company}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-violet-600 dark:text-violet-400">
                      {item.metrics}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
              Predictable Pricing
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Transparent plans that scale with your growth
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              Flat pricing. No unexpected egress penalties or per-query charges.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Annual billing</span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  SAVE 25%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map(plan => {
              const effectivePrice = calculateEffectiveMonthlyPrice(plan, billingCycle);
              const savings = calculateAnnualSavings(plan);
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all ${
                    plan.highlighted
                      ? 'bg-white dark:bg-[#111827] border-2 border-violet-600 dark:border-violet-500 shadow-xl shadow-violet-500/10'
                      : 'bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[11px] font-semibold tracking-wide shadow-sm">
                      Recommended for Growth
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                      <span className="text-xs text-slate-500">{plan.specs.workspaces}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                      {plan.tagline}
                    </p>

                    <div className="my-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                          ${effectivePrice}
                        </span>
                        <span className="text-xs text-slate-500">/ user / mo</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium font-mono">
                          Billed annually (${plan.yearlyPricePerMonth * 12}/yr) · Save ${savings}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                      {plan.features.slice(0, 5).map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={plan.id === 'enterprise' ? '/contact' : '/dashboard'}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        plan.highlighted
                          ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/pricing" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
              Compare full feature matrix & enterprise specifications &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Everything you need to know about Nexora
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-500' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-slate-900 dark:bg-[#090D16] text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Ready to upgrade your real-time operations?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Join forward-thinking engineering teams already operating with sub-second event intelligence and reliable telemetry.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-md"
            >
              Launch Live Console
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-colors"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

      {/* Video Walkthrough Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
}
