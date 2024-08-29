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
        'home': "url('src/assets/wardrobe-home-image.jpg')"
      }
    },
  },
};