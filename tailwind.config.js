/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': 'rgba(38, 159, 251, 0.3) 0px 5px, rgba(38, 159, 251, 0.2) 0px 10px, rgba(38, 159, 251, 0.1) 0px 15px, rgba(38, 159, 251, 0.05) 0px 20px',
      }
    },
  },
  plugins: [],
}