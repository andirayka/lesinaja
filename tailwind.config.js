module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      colors: {
        'default-green': '#2D9A3F',
      }
    },    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
