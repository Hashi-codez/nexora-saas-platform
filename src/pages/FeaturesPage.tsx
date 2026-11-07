import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Shield, BarChart3, Globe, Cpu, RefreshCw, 
  Database, Users, Lock, Sparkles, Server, Check, 
  ArrowRight, Play, CheckCircle2, AlertCircle, Copy
} from 'lucide-react';
import { ASSETS } from '../data/mockData';

export function FeaturesPage() {
  const [pipelineState, setPipelineState] = useState<'idle' | 'ingesting' | 'transforming' | 'stored'>('idle');
  const [payloadLogs, setPayloadLogs] = useState<string[]>([
    'System ready. Click "Dispatch Event Payload" to simulate pipeline execution.'
  ]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeLang, setActiveLang] = useState<'ts' | 'py' | 'curl'>('ts');

  const runPipelineSimulation = () => {
    if (pipelineState !== 'idle' && pipelineState !== 'stored') return;

    setPipelineState('ingesting');
    setPayloadLogs(prev => [
      `[${new Date().toLocaleTimeString()}] INGEST: Event received via Edge Gateway (EU-Frankfurt) - 1.2KB payload`,
      ...prev
    ]);

    setTimeout(() => {
      setPipelineState('transforming');
      setPayloadLogs(prev => [
        `[${new Date().toLocaleTimeString()}] TRANSFORM: Applied schema normalizer, verified signature AES-256`,
        ...prev
      ]);

      setTimeout(() => {
        setPipelineState('stored');
        setPayloadLogs(prev => [
          `[${new Date().toLocaleTimeString()}] STORED: Dispatched to active telemetry streams & OLAP engine in 11.4ms`,
          ...prev
        ]);
      }, 700);
    }, 600);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const codeSnippets = {
    ts: `import { NexoraClient } from '@nexora/client';

const nexora = new NexoraClient({
  apiKey: process.env.NEXORA_API_KEY,
  environment: 'production'
});

// Stream high-concurrency event telemetry
await nexora.events.track({
  streamId: 'orders.checkout.completed',
  userId: 'usr_8923a',
  revenue: 149.00,
  currency: 'USD',
  metadata: { cluster: 'us-east-1', cohort: 'q4_enterprise' }
});`,
    py: `from nexora import NexoraClient
import os

client = NexoraClient(api_key=os.environ.get("NEXORA_API_KEY"))

# Ingest and route streaming telemetry
client.events.track(
    stream_id="orders.checkout.completed",
    user_id="usr_8923a",
    revenue=149.00,
    currency="USD",
    metadata={"cluster": "us-east-1", "cohort": "q4_enterprise"}
)`,
    curl: `curl -X POST https://api.nexora.cloud/v1/events \\
  -H "Authorization: Bearer $NEXORA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "stream_id": "orders.checkout.completed",
    "user_id": "usr_8923a",
    "revenue": 149.00,
    "currency": "USD"
  }'`
  };

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
            <span>Capabilities & Infrastructure</span>
            <span>·</span>
            <span>Sub-Second Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Engineered from first principles for mission-critical throughput.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminate complex data stitching, brittle batch queues, and delayed metric aggregations. Nexora unifies real-time event ingestion, transformations, and observability.
          </p>
        </div>

        {/* Interactive Live Pipeline Simulator */}
        <div className="mb-20 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">
                Interactive Simulator
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Live Sub-Millisecond Stream Engine
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Dispatch an event payload and observe end-to-end processing across the Nexora pipeline.
              </p>
            </div>

            <button
              onClick={runPipelineSimulation}
              disabled={pipelineState === 'ingesting' || pipelineState === 'transforming'}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>Dispatch Event Payload</span>
            </button>
          </div>

          {/* Pipeline flow nodes */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1: Ingestion */}
            <div className={`p-5 rounded-xl border transition-all ${
              pipelineState === 'ingesting'
                ? 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/40 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
            }`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Step 1: Edge Ingestion</span>
                <span className="font-mono text-violet-600 dark:text-violet-400">1.8ms</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Payload captured at Frankfurt edge POP, validates cryptographic token, decrypts AES payload.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                {pipelineState === 'ingesting' && (
                  <span className="flex items-center gap-1.5 text-violet-600 font-medium">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Ingesting stream...
                  </span>
                )}
                {(pipelineState === 'transforming' || pipelineState === 'stored') && (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ingested
                  </span>
                )}
                {pipelineState === 'idle' && (
                  <span className="text-slate-400">Ready</span>
                )}
              </div>
            </div>

            {/* Step 2: Normalization */}
            <div className={`p-5 rounded-xl border transition-all ${
              pipelineState === 'transforming'
                ? 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/40 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
            }`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Step 2: Stream Normalization</span>
                <span className="font-mono text-violet-600 dark:text-violet-400">4.2ms</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Filters noisy attributes, executes custom schema transformations, and enriches cohort identifiers.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                {pipelineState === 'transforming' && (
                  <span className="flex items-center gap-1.5 text-violet-600 font-medium">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Normalizing...
                  </span>
                )}
                {pipelineState === 'stored' && (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Normalized
                  </span>
                )}
                {(pipelineState === 'idle' || pipelineState === 'ingesting') && (
                  <span className="text-slate-400">Waiting</span>
                )}
              </div>
            </div>

            {/* Step 3: Analytics Storage */}
            <div className={`p-5 rounded-xl border transition-all ${
              pipelineState === 'stored'
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
            }`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Step 3: Real-Time Broadcast</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">5.4ms</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Persisted to low-latency columnar storage; updates live charts and triggers active webhook subscribers.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                {pipelineState === 'stored' && (
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized in 11.4ms
                  </span>
                )}
                {pipelineState !== 'stored' && (
                  <span className="text-slate-400">Waiting</span>
                )}
              </div>
            </div>
          </div>

          {/* Event Stream Log Box */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 text-slate-400">
              <span className="text-[11px] uppercase tracking-wider">Pipeline Execution Logs</span>
              <span className="text-[11px] text-emerald-400 tabular-nums">Status: Nominal</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {payloadLogs.map((log, idx) => (
                <div key={idx} className="text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deep Dive Grid of Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Columnar Stream Storage</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ultra-compact columnar data format optimized for aggregate queries across billions of time-series points without partition locks.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero-Trust Isolation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every customer workspace operates within a cryptographically isolated tenant envelope with custom KMS customer-managed encryption keys.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Collaborative Workspaces</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Share dashboards, metric formulas, and pipeline alerts with fine-grained viewer, editor, and compliance auditor privilege tiers.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Anomaly Detection Engine</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Statistical baseline algorithms automatically detect abnormal drop-offs in checkout transactions, API errors, or unexpected churn.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Self-Hosted VPC Option</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deploy our unified container topology directly into your existing AWS or GCP VPC using automated Terraform configuration blueprints.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Region Failover</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Active-active cross-region data replication ensures zero downtime and instant failover in the event of major cloud provider outages.
            </p>
          </div>
        </div>

        {/* Developer Integration Code Showcase */}
        <div className="mb-20 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Developer Ergonomics & Native SDKs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Integrate in minutes with typed clients and reliable asynchronous buffering.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveLang('ts')}
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    activeLang === 'ts'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setActiveLang('py')}
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    activeLang === 'py'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveLang('curl')}
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    activeLang === 'curl'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  cURL
                </button>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-medium transition-colors"
                aria-label="Copy snippet"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <pre className="p-6 bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
            <code>{codeSnippets[activeLang]}</code>
          </pre>
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 lg:p-8 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Why Teams Choose Nexora vs Legacy Stacks
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Direct comparison against traditional batch warehouses and DIY open-source clusters.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Architectural Dimension</th>
                  <th className="py-3 px-4 font-semibold text-violet-600 dark:text-violet-400">Nexora Platform</th>
                  <th className="py-3 px-4 font-semibold">Legacy Data Warehouses</th>
                  <th className="py-3 px-4 font-semibold">DIY Kafka / Flink Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">Ingestion-to-Query Latency</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">&lt; 15 milliseconds</td>
                  <td className="py-3.5 px-4 text-slate-500">15 – 60 minutes (Batch)</td>
                  <td className="py-3.5 px-4 text-slate-500">Seconds (Variable)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">Setup & Maintenance</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Zero devops; 5-min SDK</td>
                  <td className="py-3.5 px-4 text-slate-500">Requires dedicated data eng</td>
                  <td className="py-3.5 px-4 text-slate-500">Heavy infrastructure ops</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">Built-in Interactive Dashboard</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Native realtime UI</td>
                  <td className="py-3.5 px-4 text-slate-500">Requires third-party BI tool</td>
                  <td className="py-3.5 px-4 text-slate-500">None (CLI/Grafana)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">Predictable Flat Billing</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Yes, transparent tiers</td>
                  <td className="py-3.5 px-4 text-slate-500">Unpredictable compute credits</td>
                  <td className="py-3.5 px-4 text-slate-500">High cloud VM sprawl</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
