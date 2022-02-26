import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';


const NavBar = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 1 }}
                            >
                                LAPR5
                            </IconButton>
                        </Link>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            <Button variant="h6" component="div" /*sx={{ flexGrow: 1 }}*/>
                                Página Principal
                            </Button>
                        </Link>
                        <Link to="/sugestao-jogadores" style={{ color: 'white', textDecoration: 'none' }}>
                            <Button variant="h6" component="div" /*sx={{ flexGrow: 1 }}*/>
                                Sugestão Jogadores
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default NavBar
