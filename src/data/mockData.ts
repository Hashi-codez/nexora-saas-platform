import { ActivityItem, NotificationItem, UserProfile } from '../types';

export const ASSETS = {
  heroDashboard: '/src/assets/images/hero_dashboard_mockup_1794073628478.jpg',
  featurePipeline: '/src/assets/images/feature_pipeline_visual_1794073628584.jpg',
  avatarAlex: '/src/assets/images/avatar_alex_chen_1794073629314.jpg',
  avatarSarah: '/src/assets/images/avatar_sarah_jenkins_1794073630576.jpg',
};

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alexandre Sharma',
  email: 'a.sharma@enterprise.io',
  role: 'VP of Platform Engineering',
  company: 'Aura Cloud Technologies',
  notificationsEnabled: true,
  twoFactorEnabled: true,
};

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'EU-Central Cluster Deployed',
    description: 'Automated failover pipeline synchronized across Frankfurt node 04.',
    timestamp: '12 minutes ago',
    type: 'pipeline',
    status: 'completed',
    user: {
      name: 'Alexandre Sharma',
      avatar: ASSETS.avatarAlex
    }
  },
  {
    id: 'act-2',
    title: 'Role-Based Access Policy Updated',
    description: 'Enforced hardware security key 2FA for all billing administrators.',
    timestamp: '48 minutes ago',
    type: 'security',
    status: 'completed',
    user: {
      name: 'Sarah Jenkins',
      avatar: ASSETS.avatarSarah
    }
  },
  {
    id: 'act-3',
    title: 'Enterprise Annual Invoice Reconciled',
    description: '$184,200 payment processed via Stripe Invoicing for Acme Corp.',
    timestamp: '2 hours ago',
    type: 'billing',
    status: 'completed',
    user: {
      name: 'Alexandre Sharma',
      avatar: ASSETS.avatarAlex
    }
  },
  {
    id: 'act-4',
    title: 'High Ingestion Throughput Warning',
    description: 'Ingestion spike peaked at 145,000 req/sec; autoscaling cluster expanded.',
    timestamp: '4 hours ago',
    type: 'pipeline',
    status: 'warning',
    user: {
      name: 'Sarah Jenkins',
      avatar: ASSETS.avatarSarah
    }
  },
  {
    id: 'act-5',
    title: 'New Dedicated Workspace Provisioned',
    description: 'Created isolation boundary for Machine Learning telemetry team.',
    timestamp: '6 hours ago',
    type: 'workspace',
    status: 'completed',
    user: {
      name: 'Alexandre Sharma',
      avatar: ASSETS.avatarAlex
    }
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pipeline Auto-Healed',
    message: 'Frankfurt cluster auto-recovered after node latency exceeded 45ms.',
    time: '5m ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: 'Monthly Limit at 78%',
    message: 'Your production workspace has consumed 780K of 1.0M allotted events.',
    time: '2h ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'notif-3',
    title: 'Audit Log Export Complete',
    message: 'SOC2 Q3 compliance report is generated and ready for secure download.',
    time: '1d ago',
    read: true,
    type: 'info'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Nexora cut our multi-region data pipeline sync latency from 450ms down to 14ms. Our infrastructure costs dropped 38% in the first quarter alone.",
    author: "Alex Chen",
    role: "Chief Technology Officer",
    company: "Vanguard Data Systems",
    metrics: "+38% Margin Gain",
    avatar: ASSETS.avatarAlex
  },
  {
    quote: "The developer ergonomics and real-time observability in Nexora are unmatched. We onboarded 80 engineers and consolidated 4 legacy analytics tools in one sprint.",
    author: "Sarah Jenkins",
    role: "VP of Product Engineering",
    company: "HyperScale Cloud",
    metrics: "4 Tools Consolidated",
    avatar: ASSETS.avatarSarah
  }
];

export const FAQ_ITEMS = [
  {
    question: "How does Nexora compare to conventional data warehouse and analytics stacks?",
    answer: "Unlike traditional data warehouses that rely on hourly batch ETL syncs, Nexora processes and normalizes events in sub-second streams. You query and visualize live operational data immediately without maintaining brittle Airflow pipelines or complex DBT setups."
  },
  {
    question: "Can we deploy Nexora inside our own AWS, GCP, or Azure Virtual Private Cloud?",
    answer: "Yes. Our Enterprise tier includes self-hosted VPC deployments, Terraform automation modules, and support for isolated Kubernetes clusters adhering to strict internal data residency mandates."
  },
  {
    question: "Is there a limit on how many team seats we can invite?",
    answer: "Starter includes up to 3 seats, Professional includes 15 seats, and Enterprise provides unlimited seats with granular role-based access control (RBAC) and SAML/Okta single sign-on."
  },
  {
    question: "What compliance certifications does Nexora maintain?",
    answer: "Nexora is SOC 2 Type II certified, ISO 27001 compliant, GDPR compliant, and supports HIPAA Business Associate Agreements (BAA) for healthcare technology organizations."
  },
  {
    question: "How difficult is it to migrate our existing webhook events and telemetry?",
    answer: "Nexora features native SDKs for Node.js, Python, Go, and React, alongside drop-in compatibility for OpenTelemetry collectors and standard REST/GraphQL ingestion webhooks."
  }
];
