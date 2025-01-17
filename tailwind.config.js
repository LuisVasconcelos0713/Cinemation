/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': `
          linear-gradient(
            to right,
               rgba(121, 128, 134, 0.8) 0%,    /* Gray1 com opacidade */
               rgba(141, 153, 160, 0.8) 29%,   /* Gray2 com opacidade */
               rgba(141, 153, 160, 0.5) 50%,   /* Gray3 com opacidade */
               rgba(143, 151, 157, 0.4) 58%,   /* Gray4 com opacidade */
               rgba(143, 150, 156, 0.5) 73%,   /* Gray5 com opacidade */
               rgba(131, 139, 145, 0.5) 86%,   /* Gray6 com opacidade */
               rgba(121, 128, 134, 0.8) 100%   /* Gray7 com opacidade */
          )
        `,
      },
      colors: {
        'Gray1': "#798086",
        'Gray2': "rgba(195, 195, 195, 0.45)",
        'Gray3': "rgb(195,195,195, 0.7)",
        'Gray4': "#c3c3c3",
        'Gray5': "#8f969c",
        'Gray6': "#848b91",
        'Gray7': "#798086",
        "WhiteText": "#e8edef",
      },
      screens: {
        phone: '390px', // Define o breakpoint para 428px
      },
    },
  },
  plugins: [],
}