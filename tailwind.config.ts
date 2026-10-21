import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        dark: "#0f172a",
        card: "#1e293b",
        surface: "#334155",
      },
    },
  },
  plugins: [],
};

export default config;
