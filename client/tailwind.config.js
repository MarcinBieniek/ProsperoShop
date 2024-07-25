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
          lg: '1300px',
          xl: '1300px',
        },
      },
    },
    fontFamily: {
      'sans': ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
}