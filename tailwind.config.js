/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'italiana': ["Italiana", 'sans-serif'],
      },
      backgroundImage: {
        'home': "url('src/assets/wardrobe-home-image.jpg')",
        'login': "url('src/assets/login-background.jpg')"
      },
      colors: {
        'reuse-light-green': "#3C704F",
        'reuse-green': '#24422F',
        'reuse-pastel': '#F6ECE2'
      }
    },
  },
};