/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A948A",
        // primary: "#07C1AF",
        secondary: "#F7F7F7",
        textPrimary: "#0A2540",
        textSecondary: "#5a627d",
        stroke: "",
      },
      spacing: {
        fluid: "100%",
      },
      container: {
        center: true,
        padding: ".6rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1210px",
          "2xl": "1300px",
        },
      },
    },
  },
  plugins: [],
};
