import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../images/logoupe.png'
import styles from './index.module.css'

export default function Navbar(){
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className={styles.navbar_bar}position="static">
              <Toolbar>
                <a href="/"><img src={logo} className={styles.navbar_logo}></img></a>
                <div className={styles.navbar_group}>
                    <a href="/eventos" className={styles.navbar_item}>Eventos</a>
                </div>
               </Toolbar>
            </AppBar>
        </Box>
        
    )
}

