import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Activity, Layers, Users, CreditCard, Settings, 
  Bell, Search, Plus, Filter, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, Clock, AlertTriangle, ShieldCheck, Download, 
  RefreshCw, ChevronRight, X, User, ExternalLink, Menu
} from 'lucide-react';
import { 
  TimeRange, 
  REVENUE_DATA_SERIES, 
  calculateSummaryMetrics, 
  formatCurrency, 
  formatCompactNumber 
} from '../utils/analytics';
import { 
  INITIAL_ACTIVITIES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_USER_PROFILE, 
  ASSETS 
} from '../data/mockData';
import { ActivityItem, NotificationItem, UserProfile } from '../types';

export function DashboardPage() {
  const [activeNav, setActiveNav] = useState<'overview' | 'analytics' | 'pipelines' | 'team' | 'billing' | 'settings'>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Persistent user state in LocalStorage
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('nexora_user_profile');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Persistent activities in LocalStorage
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_activities');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  // Persistent notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modals
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Form states for new task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'pipeline' | 'security' | 'billing' | 'workspace'>('pipeline');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Filter for activities
  const [activityFilter, setActivityFilter] = useState<'all' | 'pipeline' | 'security' | 'billing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Save to LocalStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('nexora_activities', JSON.stringify(activities));
    } catch {}
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem('nexora_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('nexora_user_profile', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentSummary = calculateSummaryMetrics(timeRange);
  const chartPoints = REVENUE_DATA_SERIES[timeRange];
  const maxRevenue = Math.max(...chartPoints.map(p => p.revenue));

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || 'Custom operational task dispatched to cluster.',
      timestamp: 'Just now',
      type: newTaskCategory,
      status: 'completed',
      user: {
        name: userProfile.name,
        avatar: ASSETS.avatarAlex
      }
    };

    setActivities(prev => [newActivity, ...prev]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsNewTaskModalOpen(false);

    // Also push a notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Operational Task Dispatched',
      message: `Task "${newActivity.title}" was recorded in audit logs.`,
      time: 'Just now',
      read: false,
      type: 'info'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredActivities = activities.filter(item => {
    const matchesFilter = activityFilter === 'all' || item.type === activityFilter;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      
      {/* Sidebar navigation */}
      <aside className={`border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] shrink-0 transition-all ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } hidden md:flex md:flex-col justify-between p-4`}>
        
        <div className="space-y-6">
          {/* Workspace Switcher / Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Nexora Cloud</div>
                  <div className="text-[10px] text-slate-500 truncate font-mono">prod-eu-west-1</div>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveNav('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'overview'
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Overview & Telemetry</span>}
            </button>

            <button
              onClick={() => setActiveNav('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'analytics'
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Revenue Analytics</span>}
            </button>

            <button
              onClick={() => setActiveNav('pipelines')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'pipelines'
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Streaming Pipelines</span>}
            </button>

            <button
              onClick={() => setActiveNav('team')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'team'
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Team & Access (RBAC)</span>}
            </button>

            <button
              onClick={() => setActiveNav('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'billing'
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Billing & Quota</span>}
            </button>

            <button
              onClick={() => setActiveNav('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'settings'
                  ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Settings & API Keys</span>}
            </button>
          </nav>
        </div>

        {/* User Card */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left group"
          >
            <img
              src={ASSETS.avatarAlex}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
            {!sidebarCollapsed && (
              <div className="truncate">
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {userProfile.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{userProfile.role}</div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Dashboard Top Header Bar */}
        <header className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0D1322]/80 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Workspaces</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-400 font-medium">Aura Cloud</span>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-900 dark:text-white capitalize">
                {activeNav}
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Search Input for filtering activities */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter logs & tasks..."
                className="w-48 lg:w-64 pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-600" />
                )}
              </button>

              {/* Notification Flyout */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-30 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Workspace Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 font-semibold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        Mark read
                      </button>
                      <button
                        onClick={clearAllNotifications}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400">
                        No active notifications.
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-xl text-xs space-y-1 transition-colors ${
                            notif.read
                              ? 'bg-slate-50 dark:bg-slate-900/40 text-slate-500'
                              : 'bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200/50 dark:border-violet-800/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900 dark:text-slate-200">{notif.title}</span>
                            <span className="font-mono text-[10px] text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 leading-snug">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dispath Task Button */}
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Task</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-4 space-y-1">
            <button
              onClick={() => { setActiveNav('overview'); setMobileSidebarOpen(false); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Activity className="w-4 h-4 text-violet-500" />
              <span>Overview & Telemetry</span>
            </button>
            <button
              onClick={() => { setActiveNav('analytics'); setMobileSidebarOpen(false); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BarChart3 className="w-4 h-4 text-violet-500" />
              <span>Revenue Analytics</span>
            </button>
            <button
              onClick={() => { setActiveNav('pipelines'); setMobileSidebarOpen(false); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Layers className="w-4 h-4 text-violet-500" />
              <span>Streaming Pipelines</span>
            </button>
            <button
              onClick={() => { setIsProfileModalOpen(true); setMobileSidebarOpen(false); }}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <User className="w-4 h-4 text-violet-500" />
              <span>User Profile Settings</span>
            </button>
          </div>
        )}

        {/* Dashboard Viewport Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Total Tracked Revenue</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {formatCurrency(currentSummary.totalRevenue)}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span>Net margin: <strong className="text-slate-700 dark:text-slate-300 font-mono">{currentSummary.marginPercent}%</strong></span>
                <span className="font-mono text-slate-400">{timeRange} cadence</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Active Streaming Nodes</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +4 nodes
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                32 Clusters
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span>Avg latency: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">11.8ms</strong></span>
                <span className="text-slate-400">Multi-region</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Monthly Event Ingestion</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +28%
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                782,410
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span>Quota consumed: <strong className="text-slate-700 dark:text-slate-300 font-mono">78.2%</strong></span>
                <span className="font-mono text-slate-400">1M cap</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Net Revenue Retention (NRR)</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +4.2%
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                134.8%
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span>Logo churn: <strong className="text-slate-700 dark:text-slate-300 font-mono">0.8%</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">Top Quartile</span>
              </div>
            </div>

          </div>

          {/* Interactive Chart Section */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6 lg:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Revenue Ingestion & Margin Trajectory
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time correlation between customer event volume and net recurring revenue.
                </p>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shrink-0 self-start sm:self-auto">
                {(['7D', '30D', '90D', '1Y'] as TimeRange[]).map(range => (
                  <button
                    key={range}
                    onClick={() => { setTimeRange(range); setHoveredPointIndex(null); }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      timeRange === range
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG / Bar Chart */}
            <div className="mt-8 space-y-4">
              <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800/80 relative">
                {chartPoints.map((point, idx) => {
                  const heightPercent = Math.round((point.revenue / maxRevenue) * 85);
                  const isHovered = hoveredPointIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    >
                      {/* Tooltip on Hover */}
                      {isHovered && (
                        <div className="absolute -top-16 z-30 px-3 py-2 rounded-xl bg-slate-900 text-white text-[11px] shadow-xl pointer-events-none whitespace-nowrap border border-slate-700 animate-in fade-in duration-100">
                          <div className="font-bold text-violet-400">{point.date}</div>
                          <div className="font-mono">Revenue: {formatCurrency(point.revenue)}</div>
                          <div className="font-mono text-slate-300">Net Profit: {formatCurrency(point.revenue - point.expenses)}</div>
                        </div>
                      )}

                      {/* Bar columns */}
                      <div className="w-full max-w-[48px] flex items-end gap-1 h-full">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isHovered
                              ? 'bg-violet-500 shadow-md shadow-violet-500/20'
                              : 'bg-violet-600/80 hover:bg-violet-500'
                          }`}
                        />
                      </div>

                      {/* Date label */}
                      <span className="text-[11px] text-slate-500 mt-2 font-mono truncate">
                        {point.date}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend & Summary */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-violet-600 inline-block" />
                    <span>Gross Ingested Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-slate-400">
                    <span>Active Cohort: Enterprise SaaS</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span>Total Period: <strong className="text-slate-900 dark:text-slate-100">{formatCurrency(currentSummary.totalRevenue)}</strong></span>
                  <span>Net Profit: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(currentSummary.netProfit)}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Activities & Telemetry Feeds Section */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6 lg:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Operational Activities & Audit Trail
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Immutable event stream of deployment pipelines, compliance policies, and billing operations.
                </p>
              </div>

              {/* Activity category segmented filter */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                {(['all', 'pipeline', 'security', 'billing'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActivityFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                      activityFilter === cat
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredActivities.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No activity events match your current filter criteria.
                </div>
              ) : (
                filteredActivities.map(item => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                    <div className="flex items-start gap-3.5">
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="text-[10px] text-slate-400 mt-1">
                          By {item.user.name} · {item.timestamp}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>

      {/* New Operational Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Log New Cluster Task / Event
              </h3>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Task / Incident Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Ingestion Gateway Re-indexed for AP-Tokyo"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Domain Category
                </label>
                <select
                  value={newTaskCategory}
                  onChange={e => setNewTaskCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
                >
                  <option value="pipeline">Pipeline & Streaming</option>
                  <option value="security">Security & Access</option>
                  <option value="billing">Billing & Invoicing</option>
                  <option value="workspace">Workspace Management</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Technical Details / Description
                </label>
                <textarea
                  rows={3}
                  value={newTaskDescription}
                  onChange={e => setNewTaskDescription(e.target.value)}
                  placeholder="Details regarding the node failover, audit check, or pipeline configuration..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-xs"
                >
                  Confirm & Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Platform Account Profile
              </h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-4">
                <img
                  src={ASSETS.avatarAlex}
                  alt={userProfile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-violet-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{userProfile.name}</div>
                  <div className="text-slate-500">{userProfile.role}</div>
                  <div className="text-violet-600 dark:text-violet-400 font-mono text-[11px]">{userProfile.company}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Display Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={e => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Account Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={e => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-700 dark:text-slate-300">Operational Email Alerts</span>
                  <input
                    type="checkbox"
                    checked={userProfile.notificationsEnabled}
                    onChange={e => setUserProfile(prev => ({ ...prev, notificationsEnabled: e.target.checked }))}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-700 dark:text-slate-300">Hardware 2FA Enforcement</span>
                  <input
                    type="checkbox"
                    checked={userProfile.twoFactorEnabled}
                    onChange={e => setUserProfile(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                  />
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-xs"
                >
                  Save Profile Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
