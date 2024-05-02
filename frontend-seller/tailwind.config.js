/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "500px",
      md: "840px",
      lg: "1024px",
    },
    extend: {
      colors: {
        "mainColor": "#FFAF38", // 메인 컬러 주황색
      }
    },
  },
  plugins: [],
}

