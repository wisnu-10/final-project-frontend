# Washio Frontend

Washio Frontend is a modern, high-performance web application built with Next.js 15, providing an intuitive interface for customers, employees, and administrators of the Washio Laundry Management System.

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
