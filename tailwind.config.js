/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#111827",
        primary: {
          DEFAULT: "#00F5FF",
          glow: "rgba(0, 245, 255, 0.35)",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          glow: "rgba(139, 92, 246, 0.35)",
        },
        accent: "#22D3EE",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        muted: "#94A3B8",
        slate: {
          950: "#090d16",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 245, 255, 0.25)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
