module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: {
          main: "#c5b295",
          light: "#dbc6a6",
          dark: "#62594a",
        },
      },

      flex: {
        "3/4": "1.5",
        2: "2",
      },

      height: {
        "25vh": "25vh",
        "50vh": "50vh",
        "75vh": "75vh",
        "90vh": "90vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
