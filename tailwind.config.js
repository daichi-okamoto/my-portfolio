// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 温かみのある世界観のパレット（CSS変数=RGBチャンネルと対応、/opacity対応）
        // 既存コンポーネント互換のためキー名は維持しつつ、色味を温かく刷新
        'background': 'rgb(var(--color-bg) / <alpha-value>)',   // 生成りクリーム
        'surface': 'rgb(var(--color-surface) / <alpha-value>)', // やや明るい面
        'header': 'rgb(var(--color-accent) / <alpha-value>)',   // テラコッタ系アクセント
        'black': 'rgb(var(--color-ink) / <alpha-value>)',       // 深いウォームブラウン（本文）
        'side': 'rgb(var(--color-muted) / <alpha-value>)',      // くすみ補助色
        'line': 'rgb(var(--color-line) / <alpha-value>)',       // 罫線
        'accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
}
