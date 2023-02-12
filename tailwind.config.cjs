/** @type {import('tailwindcss').Config} */
module.exports = {
  content: "./testEnv/**/*.{tsx}",
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#1A1A25",
        "dark-gray": "#2A2C38",
        gray: "#e9e9eb",
        red: "#F53B49",
        purple: "#7c5ab8",
        "purple-transparent": "rgba(124, 90, 184, 0.1)",
      },
      maxHeight: {
        100: "48rem",
      },
      translate: {
        center: "50%rem",
      },
    },
  },
  plugins: [],
}
