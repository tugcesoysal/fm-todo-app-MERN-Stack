/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "light-mobile": "url('./images/bg-mobile-light.jpg')",
        "dark-mobile": "url('./images/bg-mobile-dark.jpg')",
        "light-desktop": "url('./images/bg-desktop-light.jpg')",
        "dark-desktop": "url('./images/bg-desktop-dark.jpg')",
      },
      screens: {
        md: "768px",
      },
      colors: {
        "Very-Light-Gray": "hsl(0, 0%, 98%)",
        "Very-Light-Grayish-Blue": "hsl(236, 33%, 92%)",
        "Light-Grayish-Blue": "hsl(233, 11%, 84%)",
        "Dark-Grayish-Blue": "hsl(236, 9%, 61%)",
        "Very-Dark-Grayish-Blue": "hsl(235, 19%, 35%)",
        "Bright-Blue": "hsl(220, 98%, 61%)",
        "Check-bg1": "hsl(192, 100%, 67%)",
        "Check-bg2": "hsl(280, 87%, 65%)",
        dark: {
          bodyBg: "hsl(235, 21%, 11%)",
          cardBg: "hsl(235, 24%, 19%)",
          placeholder: "hsl(234, 11%, 52%)",
          circle: "hsl(237, 14%, 26%)",
          line: "hsl(237, 14%, 26%)",
          completed: "hsl(233, 14%, 35%)",
          close: "hsl(233, 14%, 35%)",
          completedHover: "hsl(234, 39%, 85%)",
          text: "hsl(234, 39%, 85%)",
          filter: "hsl(234, 11%, 52%)",
          filterHover: "hsl(236, 33%, 92%)",
        },
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      fontFamily: {
        custom: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
