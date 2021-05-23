import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
// import { MenuIcon } from '@material-ui/icons';

import ChannelApi from '../api/ChannelApi';

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

    useEffect(async () => {
        const channels = await ChannelApi.getChannelsByUser(1);
        console.log('channels: ', channels);
    });

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
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default App;
