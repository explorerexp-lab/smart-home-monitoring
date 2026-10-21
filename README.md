# 🏠 Smart Home Monitoring System

A modern, real-time web dashboard for monitoring IoT sensors and simulated CCTV feeds across a smart home environment. Built with Next.js 14 and designed for seamless deployment on Vercel.

---

## ✨ Features

- **Real-Time Sensor Dashboard** — Monitor temperature, humidity, light levels, and motion across multiple rooms.
- **Room-by-Room Overview** — View and control individual rooms with thermostat targets, lighting, and lock status.
- **CCTV Feed Simulation** — Simulated live camera feeds with motion detection indicators and status monitoring.
- **Alert Management** — Prioritized alerts for motion, temperature anomalies, smoke detection, and intrusion events.
- **Historical Data Charts** — Interactive charts powered by Recharts displaying sensor trends over time.
- **Dark-Themed UI** — A sleek, dark-mode interface optimized for monitoring dashboards.
- **Responsive Design** — Fully responsive layout that works across desktop, tablet, and mobile devices.

---

## 🛠 Tech Stack

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| **Next.js 14**   | App Router, SSR, Framework |
| **React 18**     | UI Components              |
| **TypeScript**   | Type Safety                |
| **Tailwind CSS** | Utility-First Styling      |
| **Recharts**     | Data Visualization         |
| **Lucide React** | Icon Library               |
| **date-fns**     | Date Formatting            |
| **MQTT.js**      | IoT Protocol Support       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-home-monitoring.git
cd smart-home-monitoring

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com):

1. **Push** your code to a GitHub repository.
2. **Connect** the repository to your Vercel account at [vercel.com/new](https://vercel.com/new).
3. Vercel will automatically detect the Next.js framework and configure the build settings.
4. **Deploy** — your dashboard will be live in seconds.

> The included `vercel.json` ensures the framework is correctly identified.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & Tailwind directives
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/              # Reusable UI components
│   ├── dashboard/           # Dashboard-specific components
│   └── ui/                  # Generic UI primitives
└── lib/
    ├── utils.ts             # Utilities, types & data generators
    └── mock-data.ts         # Simulated sensor & device data
```

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 🙏 Credits

- **Venkata Rao Dechiraju** — Development & Design
- **Sivanesan** — Guidance & Mentorship
- **SRMIST** — Institution

---

Built with ❤️ using Next.js and Tailwind CSS.
