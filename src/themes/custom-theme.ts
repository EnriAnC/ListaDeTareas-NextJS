import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'


export const customTheme = createTheme({
    palette:{
        mode:'dark',
        background:{
          default:'#13253B',
          paper:'#003067'
        },
        secondary:{
          main:'#458EE8',
        },
        error:{
          main: red.A400
        },
      },
  
      components:{
          MuiAppBar:{
            defaultProps:{
                elevation: 0
            },
            styleOverrides:{
                root:{
                    backgroundColor:'#003067    '
                }
            }
          }
      }
})    