import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ChannelCreate from './channel/modals/ChannelCreate';

import AuthContext from '../contexts/AuthContext';

import ChannelAPI from '../api/ChannelAPI';
import ChannelList from './channel/ChannelList';

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
    }
}));

const Home = () => {
    const [channels, setChannels] = useState([]);
    const [isLoadingChannels, setIsLoadingChannels] = React.useState(true);

    const { authenticated, setAuthenticated, user } = useContext(AuthContext);

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
                    <ChannelList channels={channels} setIsLoadingChannels={setIsLoadingChannels} />
                </Grid>
            );
        }

        return (
            <Grid item xs={9}>
                <Typography variant='h3'>No Channels Found!</Typography>;
            </Grid>
        );
    };

    return (
        <div>
            <ChannelCreate
                create={true}
                setIsLoadingChannels={setIsLoadingChannels}
                channelNames={channels.map((channel) => channel.name)}
            />
            <Grid
                container
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
