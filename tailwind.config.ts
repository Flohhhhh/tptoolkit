import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "enter": "enter 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "leave": "leave 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
      },
      keyframes: {
          "enter": {
              "0%": {
                  transform: "translateY(50px)",
                  opacity: "0"
              },
              to: {
                  transform: "translateY(0)",
                  opacity: "1"
              }
          },
          "leave": {
            "0%": {
                transform: "translateY(0)",
                opacity: "1"
            },
            to: {
                transform: "translateY(-50px)",
                opacity: "0"
            }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        shark: {
          50: "#EEEFF2",
          100: "#D3D8E4",
          200: "#B7BDCF",
          300: "#9DA6B9",
          400: "#80899E",
          500: "#626A7C",
          600: "#464D5B",
          700: "#2F343E",
          800: "#20242A",
          900: "#16181C",
          950: "#0C0E10",

        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
