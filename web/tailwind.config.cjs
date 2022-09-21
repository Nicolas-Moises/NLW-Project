/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {

      },
      backgroundImage: {
        galaxy: "url('/bg-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.87deg, #9572FC 20.46%, #43E7AD 65.61%, #E1D55D 94.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'borderGradient': 'linear-gradient(89.87deg, #9572FC 20.46%, #43E7AD 65.61%, #E2D45C 94.57%)',
      },

    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
