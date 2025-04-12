module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          snoblue: '#A4C7E7',     // pastel blue
          snobelly: '#FCEEDC',    // light beige
          snobrown: '#7A5C42',    // warm paw brown
        },
      },
    },
    plugins: [],
  };
  