import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { UIContext } from '@/context/ui';
import Link from 'next/link';


export const Navbar:React.FC = () => {

    const { openSideMenu } = useContext( UIContext)

    return ( 
        <AppBar position='sticky' elevation={ 0 }>
            <Toolbar>'
                <IconButton size='large' edge='start'
                onClick={ openSideMenu }>
                    <MenuIcon />
                </IconButton>
                <Link href="/" style={{textDecoration:'none'}}>
                    <Typography variant='h6' sx={{color:'white'}}>What to do?</Typography>
                </Link>
            </Toolbar>

        </AppBar>
     );
}
 