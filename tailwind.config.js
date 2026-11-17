/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060b17',
          900: '#0a1128',
          850: '#0f172a',
          800: '#14213d',
          700: '#1e293b',
          600: '#334155',
        },
        rr: {
          navy: '#0a1128',
          blue: '#1d4ed8',
          pink: '#d91b5c',
          pinkLight: '#f43f5e',
          pinkSubtle: '#fdf2f8',
          gold: '#c59b27',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
