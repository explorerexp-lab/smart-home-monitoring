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
        dark: "#09090b",
        card: "#09090b",
        surface: "#121215",
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
    },
  },
  plugins: [],
};

export default config;
