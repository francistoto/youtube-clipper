import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import ChannelAPI from '../api/ChannelAPI';
import AuthContext from '../contexts/auth';

import Channel from './Channel';

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
    const [channels, setChannels] = React.useState();
    const [isLoadingChannels, setIsLoadingChannels] = React.useState(true);

    const { authenticated, user: currentUser } = useContext(AuthContext);

    const handleLoginClick = (e) => {
        e.preventDefault();
        window.location.replace('/api/auth/login');
    }

    console.log('currentUser: ', currentUser);
    console.log('authenticated: ', authenticated);
    console.log('channels: ', channels);

    useEffect(async () => {
        if (isLoadingChannels && authenticated && currentUser.id) {
            const userChannels = await ChannelAPI.getChannelsByUser(currentUser.id);
            
            console.log('userChannels: ', userChannels);
            
            setChannels(userChannels);
            setIsLoadingChannels(false);
        }
    }, [authenticated, isLoadingChannels, currentUser]);
    
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
            {!isLoadingChannels &&
                <Channel channelId={7} />
            }
        </div>
    );
}

export default App;
