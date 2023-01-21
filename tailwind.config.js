/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,sass,scss}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#1A1A25",
        "dark-gray": "#2A2C38",
        gray: "#e9e9eb",
        red: "#F53B49",
        purple: "#7c5ab8",
      },
    },
  },
  plugins: [],
}
