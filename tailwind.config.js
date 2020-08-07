module.exports = {
   //whenever you compile your CSS with NODE_ENV set to production, Tailwind will automatically purge unused styles from your CSS
   purge: ["./src/**/*.html"], //https://tailwindcss.com/docs/controlling-file-size
   theme: {
      fontFamily: {
         'main': ['Roboto', 'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"'
         ]
      },
      extend: {
         flexGrow: {
            '2': '2',
            '3': '3',
            '4': '4',
         },
         minWidth: {
            '40': '40px',
            '56': '56px'
         },
         maxWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'fitcontent': 'fit-content'
         },
         width: {
            'max-content': 'max-content'
         },
         height: {
            '13': '3.25rem',
            '14': '3.5rem'
         }
      },
   },
   variants: {
      opacity: ['responsive', 'hover', 'focus', 'disabled'],
      textColor: ['responsive', 'hover', 'focus', 'visited', 'group-hover'],
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      fill: ['responsive', 'hover', 'focus'],
      fontFamily: ['responsive', 'hover', 'focus'],
      fontSize: ['responsive', 'hover', 'focus', 'group-hover'],
      cursor: ['responsive', 'hover', 'focus'],
      animation: ['responsive', 'hover', 'focus'],
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      visibility: ['responsive', 'hover', 'focus', 'group-hover'],
      display: ['responsive', 'hover', 'focus', 'group-hover'],
      outline: ['focus', 'responsive', 'hover'],
      boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      rotate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
   },
   plugins: [],
};
