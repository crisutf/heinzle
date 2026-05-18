/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-light': '#ffffff',
        'text-light': '#000000',
        'card-light': '#ffffff',
        'border-light': '#e5e7eb',
        'muted-light': '#6b7280',
        'btn-light': '#000000',
        'btn-text-light': '#ffffff',
        
        'bg-dark': '#000000',
        'text-dark': '#ffffff',
        'card-dark': '#111111',
        'border-dark': '#262626',
        'muted-dark': '#a3a3a3',
        'btn-dark': '#86efac',
        'btn-text-dark': '#000000',
        
        'accent-light': '#4ade80',
        'accent-dark': '#86efac',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

