/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // Enables dark mode via class strategy
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"],  // Only use dark theme
    darkTheme: "dark",  // Set dark as the default theme
  },
  plugins: [daisyui],
}
