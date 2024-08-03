/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#011c3b",
        primary: "#02234a",
        // primary: "#FAE47E",
        // darkPrimary: "#FFBB00",
        green1: "#5AA7A7",
        green2: "#96D7C6",
        brightGreen1: "#BAC94A",
        brightGreen2: "#E2D36B",
        blue: "#6C8CBF",
      },
    },
    screens: {
      xs: "240px",
      ss: "325px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
    },
    fontFamily: {
      Mons: "Montserrat Alternates, sans-serif",
      Kalnia: "Kalnia, serif",
      DM: "DM Serif Display, serif",
      DS: "Dancing Script, cursive",
      Quicks: "Quicksand, sans-serif",
      DMs: "DM Sans, sans-serif",
      Inter: "Inter, sans-serif",
    },
  },
  plugins: [],
};
