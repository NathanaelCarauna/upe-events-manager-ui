import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../images/logoupe.png';
import styles from './index.module.css';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Navbar(){
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className={styles.navbar_bar}position="static">
              <Toolbar>
                <div className={styles.navbar_group}>
                    <a href="/" edge="start"><img src={logo} className={styles.navbar_logo}></img></a>
                    <h2 className={styles.navbar_item}>UPE EVENTS MANAGER</h2>
                    <IconButton size="large" color="black">
                        <AccountCircle />
                    </IconButton>
                </div>
               </Toolbar>
            </AppBar>
        </Box>
        
    )
}

