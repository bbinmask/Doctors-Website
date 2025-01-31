/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
      },
      boxShadow: {
        panelShadow: "rgb(17, 12, 46, 0.15) 0px 48px 100px 0px",
        blurShadow: "rgb(17, 12, 46, 0.15) 0 0 20px 8px",
        dropShadow: "rgb(24, 26, 30, 0.75) 0 0 20px 8px",
      },
      objectPosition: {
        "25%": "25% 25%",
      },
    },
  },
  plugins: [],
};
