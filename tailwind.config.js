/*cores*/
let brandcolor = {
  birdblue: '#1D9BF0',
  platinum: '#E7E9EA',
  silver: '#71767B',
  onix: '#333639',
  richblack: '#15202B'
}


module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        ...brandcolor,    

        backgroundColor: brandcolor.richblack,
        textColor: brandcolor.platinum,
      }
    },
  },
  plugins: [],
}