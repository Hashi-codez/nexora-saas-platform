import React, { useState } from 'react';
import { X, Play, CheckCircle2, Zap, BarChart2, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pipelines' | 'security'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Nexora Interactive Product Walkthrough
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore real-time telemetry, automated pipelines, and enterprise control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close walkthrough"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature showcase tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 px-6 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Live Telemetry & ARR
            </span>
          </button>
          <button
            onClick={() => setActiveTab('pipelines')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'pipelines'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Real-time Ingestion Stream
            </span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Enterprise Governance & SOC2
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video bg-slate-900 group">
            <img
              src={activeTab === 'pipelines' ? ASSETS.featurePipeline : ASSETS.heroDashboard}
              alt="Nexora Platform Demonstration"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
                  Interactive Preview
                </span>
                <h4 className="text-lg font-semibold">
                  {activeTab === 'overview' && 'Multi-region Revenue and Operational Observability'}
                  {activeTab === 'pipelines' && 'Sub-15ms Event Streaming and Automated Logic Engine'}
                  {activeTab === 'security' && 'Role-Based Access, Audit Trails, and VPC Data Residency'}
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  {activeTab === 'overview' && 'Track ARR, gross margin, customer cohort expansion, and active telemetry clusters in real time.'}
                  {activeTab === 'pipelines' && 'Ingest 1M+ payload events per second without maintaining heavy manual database infrastructure.'}
                  {activeTab === 'security' && 'Compliant with SOC2 Type II, ISO 27001, and HIPAA with dedicated hardware 2FA policies.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Zero Setup Barrier
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Integrates in under 5 minutes using our native TypeScript and Python SDKs.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                99.99% Uptime Guarantee
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Financially backed enterprise service level agreement across 8 global edge regions.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Predictable Pricing
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Transparent flat pricing with no surprise data egress or per-query tax.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Need a custom architectural review?
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Close
            </button>
            <a
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-sm transition-colors"
            >
              Launch Live App Sandbox
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
