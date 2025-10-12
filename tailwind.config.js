/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        zero: "#d0ded8",
        one: "#C5FDD3",
        two: "#94E184",
        three: "#69C5A0",
        four: "#45A994",
        five: "#288D8A",
        six: "#126171",
        seven: "#033854"
      },
      animation: {
        fadeIn: "fadeIn 0.7s ease-in",
        fadeInLeft: "fadeInLeft 0.7s ease-in",
        fadeInRight: "fadeInRight 0.7s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
    screens: {
      sm: { max: "1000px" },
      lg: { max: "2024px", min: "1001px" },
    },
  },
  plugins: [],
};
