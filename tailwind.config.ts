import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        // OLED specific colors
        oled: {
          black: "#000000",
          card: "#000000",
          cardSubtle: "#050505",
          surface: "#0c0c0e",
          border: "#242427",
          borderSubtle: "#18181b",
          borderHighlight: "#38383e",
        },
        // Semantic Theme colors mapped via CSS variables
        theme: {
          page: "var(--bg-page)",
          card: "var(--bg-card)",
          cardHover: "var(--bg-card-hover)",
          cardSubtle: "var(--bg-card-subtle)",
          surface: "var(--bg-surface)",
          surfaceHover: "var(--bg-surface-hover)",
          header: "var(--bg-header)",
          input: "var(--bg-input)",
          border: "var(--border-color)",
          borderSubtle: "var(--border-subtle)",
          textPrimary: "var(--text-primary)",
          textSecondary: "var(--text-secondary)",
          textMuted: "var(--text-muted)",
        },
      },
      boxShadow: {
        oled: "0 0 0 1px #222225, 0 4px 20px -2px rgba(0, 0, 0, 0.9)",
        "oled-glow": "0 0 15px -3px rgba(16, 185, 129, 0.25), 0 0 0 1px #10b98150",
        "oled-glow-blue": "0 0 15px -3px rgba(59, 130, 246, 0.25), 0 0 0 1px #3b82f650",
      },
    },
  },
  plugins: [],
};

export default config;
