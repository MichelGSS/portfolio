/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#060608",
        secondary: "#0D0D12",
        tertiary: "#14141C",
        surface: "#181822",
        textPrimary: "#FAFAFA",
        textSecondary: "#A1A1AA",
        textTertiary: "#71717A",
        accent: "var(--accent-hex, #10B981)",
        borderDark: "#22222A",
        borderHover: "#3F3F4E",
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-glow': 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 100%)',
        'radial-spotlight': 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--accent-rgb, 16, 185, 129), 0.12), transparent 40%)',
      },
      boxShadow: {
        'monolith': '0 0 0 1px rgba(255,255,255,0.07), 0 20px 50px -12px rgba(0,0,0,0.8)',
        'accent-glow': '0 0 30px -5px rgba(var(--accent-rgb, 16, 185, 129), 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
