/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    maxWidth: {
      container: "980px",
    },
    extend: {
      screens: {
        xxs: "320px",
        xs: "480px",
      },
    },
  },
  plugins: [],
};
