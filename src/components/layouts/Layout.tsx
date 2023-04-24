import { Box } from '@mui/material'
import Head from 'next/head';
import {Navbar, Sidebar} from '../ui';

interface Props{
    title?:string
    children: React.ReactElement | React.ReactElement[]
}

export const Layout:React.FC<Props> = ({title = 'openjiraApp', children}) => {
    return ( 
        <Box sx={{ flexFlow: 1 }}> 
            <Head>
                <title>{title}</title>
                <meta name="description" content="Open Jira App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{ padding: '10px 20px'}}>
                {children}
            </Box>
        </Box>
     );
}
 