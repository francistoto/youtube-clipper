import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';

import AuthContext from '../contexts/AuthContext';

import ChannelAPI from '../api/ChannelAPI';

const useStyles = makeStyles((theme) => ({
    loadingContainer: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loadingCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(2)
    },
    progress: {
        marginTop: theme.spacing(5)
    },
    channelListItem: {
        width: '100%',
        margin: theme.spacing(2),
        cursor: 'pointer',
        border: '1px solid white',
        borderRadius: '5px',
        backgroundColor: 'gray'
    }
}));

const Home = () => {
    const [channels, setChannels] = useState([]);
    const [isLoadingChannels, setIsLoadingChannels] = React.useState(true);

    const { authenticated, setAuthenticated, user } = useContext(AuthContext);

    const history = useHistory();

    const classes = useStyles();

    useEffect(async () => {
        if (!authenticated) {
            setChannels([]);
        }

        if (isLoadingChannels && user.id) {
            try {
                const channelResponse = await ChannelAPI.getChannelsByUser(user.id);
                
                setChannels(channelResponse);
                setIsLoadingChannels(false);
            } catch (error) {
                const { response: { status } } = error;

                if (status === 401) {
                    setAuthenticated(false);
                }
            }
        }
    }, [authenticated, isLoadingChannels, user]);

    const renderLoadingChannels = () => {
        if (isLoadingChannels && authenticated) {
            return (
                <Grid item xs={3} className={classes.loadingContainer}>
                    <Card>
                        <CardContent className={classes.loadingCard}>
                            <Typography variant='h6' align='center'>Loading Channels</Typography>
                            <CircularProgress className={classes.progress} />
                        </CardContent>
                    </Card>
                </Grid>
            );
        }

        return null;
    };

    const renderChannelList = () => {
        if (isLoadingChannels || !authenticated) {
            return null;
        }
        
        if (channels && channels.length > 0 && !isLoadingChannels) {
            return (
                <Grid item xs={9}>
                    <List>
                    {
                        channels.map((channel, index) => {
                            const { id, name, videos } = channel;
                            return (
                                <ListItem 
                                    key={`${name}`}
                                    className={classes.channelListItem}
                                    onClick={() => { history.push(`/channel/${id}`) }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <VideocamIcon fontSize='large' />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant='h5'>Name: {name}</Typography>}
                                    />
                                </ListItem>
                            );
                        })
                    }
                    </List>
                </Grid>
            );
        }

        return (
            <Grid item xs={9}>
                <Typography variant='h3'>No Channels Found!</Typography>;
            </Grid>
        );
    }

    return (
        <div>
            <Grid
                container
                direction='column'
                alignItems='center'
                justify='center'
            >
                {renderLoadingChannels()}
                {renderChannelList()}
            </Grid>
        </div>
    );
};

export default Home;
