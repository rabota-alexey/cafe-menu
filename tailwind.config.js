module.exports = {
   //whenever you compile your CSS with NODE_ENV set to production, Tailwind will automatically purge unused styles from your CSS
   purge: ["./src/**/*.html"], //https://tailwindcss.com/docs/controlling-file-size
   theme: {
      fontFamily: {
         'main': ['IBM Plex Sans', 'system-ui',
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
         maxWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'fitcontent': 'fit-content'
         },
         minWidth: {
            '3': '0.75rem',
            '6': '1.5rem',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
         },
         width: {
            '7': '1.75rem',
            '14': '3.5rem',
            'max-content': 'max-content'
         },
         height: {
            '7': '1.75rem',
            '14': '3.5rem',
            '1/2-screen': '50vh'
         },
         minHeight: {
            '12': '3rem'
         },
         margin: {
            '7': '1.75rem',
            '11': '2.75rem',
            '1/4': '25%'
         },
         fontSize: {
            'xxs': '0.625rem'
         },
         scale: {
            '175': '1.75'
         },
      },
   },
   variants: {
      opacity: ['responsive', 'hover', 'focus', 'disabled'],
      padding: ['responsive', 'hover', 'focus'],
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
      flex: ['responsive', 'hover', 'focus', 'group-hover'],
      zIndex: ['responsive', 'hover', 'focus'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      scale: ['responsive', 'hover', 'focus']
   },
   plugins: [],
};
