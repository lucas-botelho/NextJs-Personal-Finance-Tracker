import type { Config } from "tailwindcss";
import colors, { gray } from "tailwindcss/colors";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          discord: {
            500: '#424549',
            600: '#36393e',
            700: '#282b30',
            900: '#1e2124',
          },
          custom: {
            100: '#e0e1dd',
          }
        },
        blue: {
          discord: {
            500: '#7289da',
          },
          custom: {
            300: '#778da9',
            500: '#415a77',
            700: '#1b263b',
            900: '#0d1b2a',
          }
        },
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
  "editor.quickSuggestions": {
    "strings": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
};
export default config;
