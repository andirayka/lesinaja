module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "default-green": "#10B981",
      },
      backgroundImage: () => ({
        "logreg-img": "url('src/assets/images/logreg-logo.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
