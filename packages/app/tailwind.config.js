const colors = require("tailwindcss/colors");
const primary = colors.amber;
const chrome = colors.orange;

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
          DEFAULT: colors.gray[400],
          inverted: colors.white,
        },
        paper: {
          DEFAULT: colors.gray[200],
        },
        error: {
          DEFAULT: colors.red[500],
          inverted: colors.white,
        },
        loading: {
          DEFAULT: colors.gray[200],
          inverted: colors.gray[500],
        },
        warning: {
          DEFAULT: colors.amber[400],
          inverted: colors.white,
        },
        info: {
          DEFAULT: primary[200],
          inverted: colors.black,
        },
        chrome: {
          light: chrome[300],
          DEFAULT: chrome[500],
          dark: chrome[700],
          inverted: colors.white,
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
