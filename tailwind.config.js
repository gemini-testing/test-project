/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основные цвета TestPlane
        primary: {
          50: '#e6f8fa',
          100: '#ccf1f6',
          200: '#99e3ed',
          300: '#66d5e4',
          400: '#33c7db',
          500: '#00b9d2', // Основной бирюзовый цвет TestPlane
          600: '#0094a8',
          700: '#006f7e',
          800: '#004a54',
          900: '#00252a',
        },
        secondary: {
          50: '#e6eaef',
          100: '#ccd5df',
          200: '#99abbe',
          300: '#66829e',
          400: '#33587d',
          500: '#002e5d', // Основной темно-синий цвет TestPlane
          600: '#00254a',
          700: '#001c38',
          800: '#001225',
          900: '#000913',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        success: '#49cc90', // Зеленый цвет для успешных действий (как в TestPlane)
        warning: '#fca130', // Оранжевый цвет для предупреждений
        danger: '#f93e3e',  // Красный цвет для ошибок/опасных действий
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'], // TestPlane использует моноширинный шрифт для код-блоков
      },
      boxShadow: {
        'tp': '0 4px 6px -1px rgba(0, 46, 93, 0.1), 0 2px 4px -1px rgba(0, 46, 93, 0.06)', // Тень в стиле TestPlane
      },
      borderRadius: {
        'tp': '0.375rem', // Радиус скругления в стиле TestPlane
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
