# Nexora — Next-Generation Enterprise SaaS Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Nexora** is a commercial-grade, modern SaaS platform engineered for hypergrowth teams requiring real-time event telemetry, streaming pipelines, revenue analytics, and enterprise multi-workspace governance.

Inspired by industry design leaders such as **Linear**, **Stripe**, **Vercel**, and **Framer**, Nexora combines a high-converting marketing surface with an interactive, responsive operational console.

---

## 🌟 Key Features

### 1. Modern Minimalist Design System
- **Strict Visual Restraint**: Cohesive dark navy, slate, crisp white, and subtle violet palette adhering to 60-30-10 color allocation rules.
- **Top Bar Contract**: Clean 3-zone header with single wordmark, clean single-line links, quick search trigger, and theme switcher.
- **Dual-Theme Engine**: Persistent Light and Dark mode with zero contrast failure or flash, backed by `localStorage` and Tailwind v4 `@custom-variant dark`.
- **Fluid Typography**: Sized with `Plus Jakarta Sans` for display and body prose, paired with `JetBrains Mono` for tabular numerals (`tabular-nums`).

### 2. Full Marketing Website Pages
- **Home Page (`/`)**: High-impact hero with product preview, trust metrics, bento feature showcase, how it works flow, customer testimonials with verified portraits, pricing teaser, and FAQ accordion.
- **Features Page (`/features`)**: Deep architectural capabilities, live interactive stream pipeline simulator, developer SDK snippets (TypeScript, Python, cURL), and competitive comparison matrix.
- **Pricing Page (`/pricing`)**: Interactive monthly/yearly billing toggle (with 25% annual savings calculation), 3 plan tiers (Starter, Professional, Enterprise), and full feature comparison table.
- **Contact Page (`/contact`)**: Multi-field inquiry form with live client-side validation, error handling, success modal, and persistent record storage in `localStorage`.

### 3. Interactive Operational Dashboard (`/dashboard`)
- **Live KPI Telemetry**: Real-time metrics for Total Tracked Revenue, Active Streaming Nodes, Ingestion Quota, and Net Revenue Retention (NRR).
- **Interactive Revenue Chart**: Toggle between 7-day, 30-day, 90-day, and 1-year windows with hover tooltips displaying gross revenue, expenses, and net profit.
- **Operational Audit Log**: Filterable activity stream with live task dispatcher ("Log Task") that updates state and persists across sessions.
- **Notification Tray**: Real-time workspace alerts with unread counter, "Mark Read", and "Clear" actions.
- **User Profile Management**: Editable user details and toggles for hardware 2FA and operational alerts.
- **Command Palette (`Cmd+K`)**: Instant keyboard-driven global search across pages and platform features.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Declarative component architecture and state management |
| **Vite** | Blazing-fast development environment and bundler |
| **Tailwind CSS v4** | Modern utility-first CSS styling with custom dark variant |
| **TypeScript** | Strict type safety and interface contracts |
| **React Router** | Client-side routing and deep-linking |
| **Lucide React** | Clean, consistent icons across UI |
| **LocalStorage** | Persistent theme preferences, user profiles, activities, and inquiries |
| **Node.js Test Runner** | Decoupled pure logic unit tests (`node:test`, `node:assert/strict`) |

---

## 📁 Folder Structure

```text
├── index.html                  # HTML entry point with meta tags & Google Fonts
├── metadata.json               # Applet configuration metadata
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
├── LICENSE                     # MIT license file
├── README.md                   # Project documentation
│
└── src/
    ├── main.tsx                # React root bootstrap
    ├── App.tsx                 # Router & layout provider
    ├── index.css               # Global styles & Tailwind v4 dark variant
    │
    ├── assets/
    │   └── images/             # High-resolution visual assets & portraits
    │
    ├── context/
    │   └── ThemeContext.tsx    # Theme provider with localStorage sync
    │
    ├── types/
    │   └── index.ts            # Shared TypeScript type definitions
    │
    ├── data/
    │   └── mockData.ts         # Domain mock data, testimonials & activities
    │
    ├── utils/
    │   ├── pricing.ts          # Pure pricing calculation logic
    │   ├── pricing.test.ts     # Unit tests for pricing logic
    │   ├── validation.ts       # Contact form validation logic
    │   ├── validation.test.ts  # Unit tests for validation logic
    │   ├── analytics.ts        # Chart aggregation and formatting math
    │   └── analytics.test.ts   # Unit tests for analytics logic
    │
    ├── components/
    │   ├── Navbar.tsx          # Top navigation bar with theme and mobile drawer
    │   ├── Footer.tsx          # Semantic footer with newsletter signup
    │   ├── CommandPalette.tsx  # Quick search dialog (Cmd+K)
    │   └── VideoModal.tsx      # Product demo video walkthrough modal
    │
    └── pages/
        ├── HomePage.tsx        # Hero, bento features, stats, FAQ, testimonials
        ├── FeaturesPage.tsx    # Interactive pipeline simulator & SDK showcase
        ├── PricingPage.tsx     # Monthly/Yearly plans & comparison matrix
        ├── ContactPage.tsx     # Contact form with live validation
        └── DashboardPage.tsx   # Interactive console with charts & activities
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm or yarn

### Installation
```bash
# 1. Clone repository
git clone https://github.com/your-username/nexora-saas-platform.git
cd nexora-saas-platform

# 2. Install dependencies
npm install

# 3. Run unit tests
npm test # or npx tsx --test src/utils/*.test.ts

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore Nexora.

---

## 🧪 Testing

Nexora maintains decoupled pure logic modules verified via Node's native test runner:

```bash
npx --yes tsx --test src/utils/*.test.ts
```

All pricing calculations, contact form validation rules, and analytics data aggregations are covered by automated unit tests.

---

## 📱 Responsiveness

Nexora is tested across all major breakpoints:
- **Mobile Phones** (320px – 480px): Compact navigation drawer, full-width touch cards, 0 horizontal scroll.
- **Tablets** (481px – 768px): Flexible bento grid reflow, collapsible sidebar.
- **Laptops & Desktops** (1024px – 1440px+): Full-bleed dashboard layout, spacious metrics hierarchy, and smooth hover interactions.

---

## 🔮 Future Improvements

- [ ] Export dashboard telemetry to CSV and PDF audit formats
- [ ] Drag-and-drop widget customizer for personalized dashboard views
- [ ] OAuth integration for GitHub, Google Workspace, and Slack alerts
- [ ] Multi-region latency ping prober with live WebGL globe view

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
