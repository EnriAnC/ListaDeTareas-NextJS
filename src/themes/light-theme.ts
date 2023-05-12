import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'


export const lightTheme = createTheme({
    palette:{
      mode:'light',
      background:{
        default: grey[300]
      },
      primary:{
        main:'#2E3236'
      },
      secondary:{
        main:'#D0E7F5'
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
                backgroundColor:'#2E3236'
            }
        }
        }
    }
})    