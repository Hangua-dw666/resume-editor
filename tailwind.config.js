/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'resume-gray': '#333333',
        'resume-light': '#666666',
        'resume-border': '#e5e5e5',
      },
      fontFamily: {
        'resume': ['Microsoft YaHei', 'SimHei', 'sans-serif'],
      },
    },
  },
  plugins: [],
}