const colors = require("tailwindcss/colors");
const primary = colors.cyan;

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: colors.black,
          inverted: colors.white,
        },
        primary: {
          light: primary[200],
          DEFAULT: primary[400],
          dark: primary[600],
          inverted: colors.white,
        },
        secondary: {
          DEFAULT: colors.gray[800],
        },
        paper: {
          DEFAULT: colors.gray[100],
        },
        error: {
          DEFAULT: colors.red[500],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
