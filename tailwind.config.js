/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "roboto monospace",
    }, // we override the sans default config given by tailwindcss configuration by giving our font family (given the link in index.html)
    extend: {},
  },
  plugins: [],
};
