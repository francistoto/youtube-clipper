import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Login from './modals/Login';

import AuthContext from '../contexts/AuthContext';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'inherit',
        color: 'inherit'
    }
}));

const Header = () => {
    const { authenticated } = useContext(AuthContext);
    const classes = useStyles();

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                >
                    <MenuIcon />
                </IconButton>
                <Typography component={Link} to='/' variant='h5' className={classes.title} >
                    Welcome to YouTube Mashup!
                </Typography>
                {!authenticated
                    ? <Login />
                    : <UserMenu />
                }
            </Toolbar>
        </AppBar>
    )
};

export default Header;
