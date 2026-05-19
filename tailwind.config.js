module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gradientStart: '#ff7eb3',
        gradientEnd: '#ff758c'
      },
      animation: {
        pulse: 'pulse 2s infinite'
      }
    }
  },
  plugins: []
};