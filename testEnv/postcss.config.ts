import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"

module.exports = {
  plugins: [tailwindcss("./tailwind.config.ts"), autoprefixer],
}
