import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

import styles from "./index.module.css";
import logo from "../../images/logo_upexplorer.png";

export default function Navbar() {
    const [selected, setSelected] = useState('inicio');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (menu) => {
        setSelected(menu);
        setAnchorEl(null);
    };

    const handleMenuIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={styles.navbar_bar}>
            <Link to="/">
                <img src={logo} className={styles.navbar_logo} alt="UPEXPLORER" />
            </Link>
            <ul className={styles.menu}>
                <li className={`${styles.menu_item} ${selected === 'inicio' ? styles.selected : ''}`} onClick={() => handleMenuClick('inicio')}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <HomeIcon/> Início
                    </Link>
                </li>
                <li className={`${styles.menu_item} ${selected === 'eventos' ? styles.selected : ''}`} onClick={() => handleMenuClick('eventos')}>
                    <Link to="/eventos" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <EventIcon/> Eventos
                    </Link>
                </li>
                <li className={`${styles.menu_item} ${selected === 'papers' ? styles.selected : ''}`} onClick={() => handleMenuClick('papers')}>
                    <Link to="/papers" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ArticleIcon/> Papers
                    </Link>
                </li>
            </ul>
            <div className={styles.red_bar}></div>
        </Box>
    );
}
