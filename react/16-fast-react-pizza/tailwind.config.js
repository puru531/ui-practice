/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },

    extend: {
      //if want keep everything of tailwing but want to extend something from ypour side and ass inside extent{}
      colors: {
        pizza: '#123456',
      },
      height: {
        screen: '100dvh', //dynamic viewport height, work nice in mobile also.
      },
    },
  },
  plugins: [],
};
