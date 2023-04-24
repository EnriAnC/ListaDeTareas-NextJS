import { Drawer, Box, Typography, List, 
    ListItem, ListItemIcon, ListItemText, Divider
    } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useContext } from 'react';
import { UIContext } from '@/context/ui';

const menuItems:string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar:React.FC = () => {

    const { sidemenuOpen, closeSideMenu } = useContext( UIContext )

    return ( 
        <Drawer anchor='left'
        open={sidemenuOpen}
        onClose={ closeSideMenu }>

            <Box sx={{width: 250}}>
                <Box sx={{ padding:'5px 10px'}}>
                    <Typography variant='h4'>Menu</Typography>
                </Box>

                <Divider />

                <List>
                    {
                        menuItems.map( (text,index) =>(
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    { index % 2 ? <InboxIcon /> : <MailOutlineIcon />   }
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />
            </Box>
        </Drawer>
     );
}
 