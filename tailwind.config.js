/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FCFBF8',
          100: '#F7F4ED', // Primary paper background
          200: '#EFEBE1',
          300: '#E5DFD3',
        },
        ink: {
          DEFAULT: '#171717', // Primary ink text
          muted: '#5F5A52',   // Secondary text
          light: '#857F75',   // Subtle metadata
        },
        rule: {
          DEFAULT: '#D8D2C7', // Hairlines and rules
          light: '#EAE6DE',
          dark: '#B8B0A2',
        },
        burgundy: {
          DEFAULT: '#6E3434', // Primary accent
          light: '#884343',
          dark: '#542727',
        },
        olive: {
          DEFAULT: '#525845', // Secondary accent
          light: '#6B735B',
          dark: '#3C4132',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'EB Garamond', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'widest-editorial': '0.22em',
        'loose-editorial': '0.12em',
      },
      lineHeight: {
        'poem': '1.9',
      }
    },
  },
  plugins: [],
}
