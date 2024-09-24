// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { // extendを使用してデフォルト設定を拡張
      colors: {
        'background': '#ecece7',
        'header': '#A28D69',
        'black': '#302B2B',
      },
    },
  },
  plugins: [],
}
