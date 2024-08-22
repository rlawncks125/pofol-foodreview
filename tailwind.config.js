/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    maxWidth: {
      container: "980px",
      "small-container": "780px",
      form: "768px",
    },
    extend: {
      screens: {
        xxs: "320px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
