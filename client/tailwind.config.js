/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '700px',
          md: '800px',
          lg: '1000px',
          xl: '1200px',
        },
      },
    },
    fontFamily: {
      'sans': ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
}