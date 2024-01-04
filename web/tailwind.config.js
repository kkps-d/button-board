import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app-oobe/**/*.{html,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
