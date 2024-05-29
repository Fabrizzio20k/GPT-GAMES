import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alata: ['Alata', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'ebony': {
          '50': '#f2f4fd',
          '100': '#e4e6fa',
          '200': '#c2cbf5',
          '300': '#8c9eed',
          '400': '#4f6ce1',
          '500': '#2848cf',
          '600': '#1932b0',
          '700': '#16298e',
          '800': '#162676',
          '900': '#182262',
          '950': '#060819',
        },
        'gulf-blue': {
          '50': '#ebf2ff',
          '100': '#dae9ff',
          '200': '#bdd4ff',
          '300': '#95b6ff',
          '400': '#6b8cff',
          '500': '#4863ff',
          '600': '#2835ff',
          '700': '#1d27e5',
          '800': '#1a24b9',
          '900': '#1e2791',
          '950': '#1F212D',
        },


      },
    },
  },
  plugins: [],
};
export default config;
