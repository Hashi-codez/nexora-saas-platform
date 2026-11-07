import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Shield, Clock, ArrowRight } from 'lucide-react';
import { validateContactForm, ContactFormData, ValidationErrors } from '../utils/validation';

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    planInterest: 'pro'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate realistic network round-trip & persist inquiry to localStorage
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('nexora_inquiries') || '[]');
        existing.push({
          ...formData,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('nexora_inquiries', JSON.stringify(existing));
      } catch (err) {
        // ignore storage errors
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      planInterest: 'pro'
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
            <span>Engineering & Solutions Advisory</span>
            <span>·</span>
            <span>Fast Response SLA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Get in touch with our platform team.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Have questions regarding high-volume telemetry ingestion, enterprise compliance, or VPC deployments? Our solutions engineers are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info & Trust Signals (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-7 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Direct Communication Channels
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-200">Engineering & Solutions Support</div>
                    <a href="mailto:solutions@nexora.cloud" className="text-violet-600 dark:text-violet-400 hover:underline">
                      solutions@nexora.cloud
                    </a>
                    <div className="text-slate-500 mt-0.5">Average response time: &lt; 2 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-200">Enterprise Sales Hotline</div>
                    <span className="font-mono text-slate-700 dark:text-slate-300">+1 (888) 492-NEXORA</span>
                    <div className="text-slate-500 mt-0.5">Mon–Fri 8am–8pm ET</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-200">San Francisco Headquarters</div>
                    <div className="text-slate-600 dark:text-slate-400">
                      548 Market Street, Suite 89200<br />
                      San Francisco, CA 94104
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Security Commitment Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                <Shield className="w-4 h-4 text-emerald-500" />
                Security & NDA Guarantees
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We sign mutual Non-Disclosure Agreements (NDAs) prior to architectural reviews. All submitted project requirements and architecture documents are treated under strict confidentiality.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-8 shadow-sm">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Message Dispatched Successfully
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900 dark:text-slate-200">{formData.fullName}</strong>. A Nexora solutions architect has received your inquiry and will reach out to <strong className="text-slate-900 dark:text-slate-200">{formData.email}</strong> within 2 business hours.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-violet-600 text-white font-semibold text-xs hover:bg-slate-800 dark:hover:bg-violet-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Send a Message to Engineering
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Fill out the form below. All required fields are validated immediately.
                    </p>
                  </div>

                  {/* Full Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Alexandre Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company & Plan Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Company / Organization
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Aura Cloud Technologies"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="planInterest" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Tier of Interest
                      </label>
                      <select
                        id="planInterest"
                        name="planInterest"
                        value={formData.planInterest}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 transition-colors"
                      >
                        <option value="starter">Starter Plan ($29/mo)</option>
                        <option value="pro">Professional Plan ($79/mo)</option>
                        <option value="enterprise">Enterprise & Custom VPC ($199+/mo)</option>
                        <option value="general">General Partnership / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Migration from AWS Kinesis to Nexora Streaming Engine"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.subject
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Inquiry Details & Architecture Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your current ingestion volume, target SLA, and any compliance requirements (e.g. HIPAA BAA or EU-Frankfurt data locality)..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-colors leading-relaxed ${
                        errors.message
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-slate-800 focus:border-violet-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-violet-600 hover:bg-slate-800 dark:hover:bg-violet-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Validating & Transmitting...' : 'Submit Inquiry to Engineering'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
