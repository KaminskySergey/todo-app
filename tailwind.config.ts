import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#f5f5f5", 
          dark: "#1C274C", 
        },
      },
    },
    colors: {
      dark: "#1C274C",
    },
    screens: {
      xs: "320px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1440px",
    },
    boxShadow: {
      1: "0px 1px 2px 0px rgba(166, 175, 195, 0.25)",
    },
    animation: {
      "spin-reverse": "spin 1s linear infinite reverse",
    },
  },
  plugins: [],
};
export default config;
