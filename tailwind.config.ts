import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        accent: {
          50: "#eef4ff",
          100: "#d9e7ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8"
        }
      },
      boxShadow: {
        panel: "0 24px 60px -32px rgba(15, 23, 42, 0.28)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top, rgba(59,130,246,0.16), transparent 38%), radial-gradient(circle at right, rgba(99,102,241,0.10), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
