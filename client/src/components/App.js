import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import ChannelApi from '../api/ChannelApi';
import UserApi from '../api/UserApi';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

const App = () => {
    const classes = useStyles();
    const [authenticated, setAuthenticated] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({});

    const handleLoginClick = (e) => {
        e.preventDefault();
        window.location.replace('/api/auth/login');
    }
    
    useEffect(async () => {
        if (!authenticated) {
            const { user, authenticated } = await UserApi.getCurrentUser();
            
            setAuthenticated(authenticated);
            setCurrentUser(user);
        }
        
        const channels = await ChannelApi.getChannelsByUser(1);
    }, []);
    
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h5' className={classes.title}>
                        Welcome to YouTube Mashup!
                    </Typography>
                    {!authenticated
                        ? <Button onClick={handleLoginClick} color='inherit'>Login</Button>
                        : <IconButton color='inherit'><AccountCircleIcon /></IconButton>
                    }
                </Toolbar>
            </AppBar>
            {authenticated && 
                <Typography variant='h5' className={classes.title}>
                    {`You are logged in as ${currentUser.firstName} ${currentUser.lastName}`}
                </Typography>
            }
        </div>
    );
}

export default App;
