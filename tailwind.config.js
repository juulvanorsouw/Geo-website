/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'white': '#FFFFFF',
        'dark-background': '#420c0c',
        'darker-background': '#202632',
        'text-color-primary': '#FFFFFF',
        'text-color-secondary': '#b0b0b0',
        'text-color-sidebar': '#b0b0b0',
        'accent-red': '#ec0909',
        'accent-gray': '#5A5B4D',
        'shadow-light': 'rgba(0, 0, 0, 0.4)',
        'background': '#000000',
      },
    },
  },
  plugins: [],
}
