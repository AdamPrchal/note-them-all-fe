module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/react-toastify/dist/ReactToastify.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
