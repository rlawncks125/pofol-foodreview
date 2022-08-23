/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        mo: "375px",
      },
    },
  },
  plugins: [],
};
