

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      width: {
        '1100': '1100px'
      },
      backgroundColor: {
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#f73859',
        secondary3: '#febb02',
        secondary4: '#23A8F2',
        'overlay-30': 'rgb(0,0,0,0.3)',
        'overlay-50': 'rgb(0,0,0,0.5)',
      },
      maxWidth: {
        '600': '600px',
        '1100': '1100px'
      },
      minWidth: {
        '300': '300px',
        '200': '200px'
      },
      flex: {
        '3': '3 3 0%'
      }
    },
  },
  plugins: [],
}

