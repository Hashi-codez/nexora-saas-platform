import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Github, Twitter, Linkedin, Check } from 'lucide-react';

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080C14] text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Mission column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>Nexora</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Nexora provides real-time event ingestion, automated streaming logic, and high-performance financial analytics for modern cloud engineering teams.
            </p>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub repository" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter account" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Real-Time Engine</Link></li>
              <li><Link to="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Event Pipelines</Link></li>
              <li><Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">Live Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Enterprise Security</Link></li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Resources
            </div>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Status Page</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Security & SOC2</Link></li>
            </ul>
          </div>

          {/* Engineering Dispatch / Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Engineering Dispatch
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Get bi-weekly updates on high-concurrency event architecture and platform upgrades.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="eng-lead@company.com"
                    required
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-violet-600 text-white font-medium hover:bg-slate-800 dark:hover:bg-violet-700 transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Nexora Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Security Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
