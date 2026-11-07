export type Theme = 'light' | 'dark';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'pipeline' | 'security' | 'billing' | 'workspace';
  status: 'completed' | 'in_progress' | 'warning';
  user: {
    name: string;
    avatar: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  company: string;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
}
