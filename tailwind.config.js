/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        secondary: "#111111",
        tertiary: "#1A1A1A",
        textPrimary: "#FAFAFA",
        textSecondary: "#A0A0A0",
        textTertiary: "#666666",
        accent: "#FFFFFF",
        borderDark: "#2A2A2A",
        borderHover: "#444444",
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-glow': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)',
      }
    },
  },
  plugins: [],
}