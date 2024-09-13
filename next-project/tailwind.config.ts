import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        height: {
          'calc-h': 'calc(100vh-5rem)',
        },
        colors: {
          primary: '#ff00ff',
          secondary: '#363636',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
