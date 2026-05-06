# diLaundryin

![diLaundryin Logo](public/logo-Photoroom.png)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-teal?style=flat)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-%23455A64?style=flat)](https://www.prisma.io/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-components-%23000000?style=flat)](https://shadcn.com/)

## Project Overview

diLaundryin is a scalable laundry management platform built for modern service operations. It connects customers, drivers, workers, and administrators through a unified Next.js App Router experience. The application is designed to simplify order flow, improve delivery visibility, and support a multi-role dashboard architecture.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Forms & Validation**: Formik & Yup
- **Maps**: Leaflet JS & React-Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React & React Icons
- **Notifications**: SweetAlert2 & React Hot Toast
- **HTTP Client**: Axios

## 📂 Project Structure

The project uses the Next.js App Router with Route Groups for role-based navigation:

```text
src/
├── app/                # Next.js App Router (File-based routing)
│   ├── (auth)/         # Authentication pages (Login, Register)
│   ├── (customer)/     # Customer dashboard and order pages
│   ├── (driver)/       # Driver task management
│   ├── (worker)/       # Laundry processing interface
│   ├── (outlet-admin)/ # Outlet management and reports
│   └── (super-admin)/  # System-wide administrative controls
├── components/         # Shared UI components
├── features/           # Feature-specific logic and components
├── hoc/                # Higher-Order Components (e.g., Auth protection)
├── hooks/              # Custom React hooks
├── stores/             # Zustand state stores
├── types/              # TypeScript definitions
└── utils/              # Helper functions and constants
```

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env` file in the `frontend` directory:

```env
NEXT_PUBLIC_BASE_API_URL="http://localhost:8000"
NEXT_PUBLIC_MAPBOX_TOKEN="your_mapbox_token" (if applicable)
```

### 2. Installation
```bash
npm install
npm run dev
```

## ✨ Key Features

### 🗺️ Interactive Maps
- Real-time geolocation for address selection.
- Map-based outlet discovery.
- Reverse geocoding to automatically fill address details.

### 📱 Responsive Design
- Fully optimized for Mobile, Tablet, and Desktop.
- Role-specific layouts and navigation bars.

### 🔐 Secure Navigation
- HOC-based route protection to ensure users only access their authorized areas.
- Persistent authentication state via Zustand and cookies.

### 📊 Rich Analytics
- Visualized reports using Recharts for outlet admins.
- Real-time status tracking for customer orders.

## 🎨 UI/UX Principles
- **Modern Aesthetics**: Vibrant gradients, glassmorphism, and clean typography.
- **Micro-interactions**: Subtle hover effects and loading states for better engagement.
- **Accessibility**: Semantic HTML and clear navigation hierarchy.

## 🛠 Maintenance & Best Practices
- **Atomic Components**: Small, reusable UI components.
- **Custom Hooks**: Encapsulated logic for data fetching and side effects.
- **Strict Typing**: Full leverage of TypeScript for a bug-free experience.

## ⚙️ Challenges & Solutions
- **Complex state management** for multi-level address selection was handled with isolated Zustand stores, reducing shared state coupling.
- **Multi-role navigation** was implemented through route groups and permission-aware page rendering to preserve clarity and scalability.
- **Real-time order updates** were managed with efficient data polling and local state reconciliation to keep the UI responsive without unnecessary re-renders.

## 🤝 Contribution
Contributions are welcome.

1. Fork this repository.
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Install dependencies: `npm install`
4. Commit your changes: `git commit -m "feat: add new feature"`
5. Push your branch and open a pull request.

Please keep changes focused, maintain clean component structure, and preserve TypeScript safety.

## License

MIT License