/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#e7fbf5", 500: "#18b391", 600: "#13a184" }
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
}