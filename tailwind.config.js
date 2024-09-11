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
        'login': "url('https://ik.imagekit.io/sfl8kzqbl/Turma%2004%20PI/fundo-cadastro-login.jpg?updatedAt=1726008120663')"
      },
      colors: {
        'reuse-light-green': "#3C704F",
        'reuse-green': '#24422F',
        'reuse-pastel': '#F6ECE2'
      }
    },
  },
};