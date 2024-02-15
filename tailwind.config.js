/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mylight: {
          "color-scheme": "light",
          "primary": "#45bfe8",
          "secondary": "#aa9fd6",
          "accent": "#b4e9d6",
          "neutral": "#ebcff7",
          "neutral-content": "#000000",
          "base-100": "oklch(100% 0 0)",
          "base-200": "#f9fafb",
          "base-300": "#d1d5db",
          "base-content": "#000000",
        },
        mydark: {
          "color-scheme": "dark",
          "primary": "#7582ff",
          "secondary": "#c484e7",
          "accent": "#00c7b5",
          "neutral": "#2a323c",
          "neutral-content": "#A6ADBB",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          "base-content": "#A6ADBB",
        },
      },
    ],
    darkTheme: 'mydark',
  },
}

