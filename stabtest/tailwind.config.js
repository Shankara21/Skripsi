/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      scale: {
        150: "1.5",
        175: "1.75",
        200: "2",
      },
      backgroundImage: {
        "bg-pattern": "url('assets/bg1.jpg')",
      },
      textColor: {
        cBlue: "#161D6F",
      },
      backgroundColor: {
        cBlue: "#161D6F",
      },
      colors: {
        cBlue: "#161D6F",
      },
      fontFamily: {
        kalam: ["Kalam", "cursive"],
      },
      transitionDuration: {
        1500: "1500ms",
        2000: "2000ms",
      },
    },
  },
  plugins: [require("daisyui")],
};
