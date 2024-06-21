import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        primary: "#e82c54",
        success: "#2bff00",
        danger: "#ff0004",
      },
      textColor: {
        primary: "#e82c54",
        success: "#2bff00",
        danger: "#ff0004",
      },
      borderColor: {
        primary: "#e82c54",
        success: "#2bff00",
        danger: "#ff0004",
      },
      backgroundColor:{
        
        primary:"#e82c54",
      success:"#2bff00",
      danger:"#ff0004"
      },
      boxShadow: {
        'primary': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
