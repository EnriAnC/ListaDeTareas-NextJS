import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'


export const customTheme = createTheme({
    palette:{
        mode:'dark',
        background:{
          default:'#257CC2',
          paper:'#0B4575'
        },
        secondary:{
          main:'#5485C1',
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
                    backgroundColor:'#0B4575'
                }
            }
          }
      }
})    