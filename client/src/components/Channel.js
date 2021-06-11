import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import ChannelAPI from '../api/ChannelAPI';
import PlayerWrapper from './player/PlayerWrapper';
import AuthContext from '../contexts/AuthContext';

const Channel = () => {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const [isLoadingChannel, setIsLoadingChannel] = useState(true);

    const { setAuthenticated } = useContext(AuthContext);

    const { channelId } = useParams();

    useEffect(async () => {
        if (isLoadingChannel) {
            try {
                const channelResponse = await ChannelAPI.getChannelById(channelId);
    
                setChannel(channelResponse);
                setVideos(channelResponse.videos);
            } catch (error) {
                const { response: { status } } = error;
                
                setChannel({});
                setVideos([]);

                if (status === 401) {
                    setAuthenticated(false);
                }
            }

            setIsLoadingChannel(false);
        }
    }, [channel, isLoadingChannel]);

    const refreshChannel = useCallback(() => {
        setIsLoadingChannel(true);
    }, [isLoadingChannel]);

    return (
        <Container>
            {
                videos.length > 0
                ? <Grid container justify='center'>
                    <Grid item xs={10}>
                        <PlayerWrapper
                            channelId={channelId}
                            videos={videos}
                            refreshChannel={refreshChannel}
                        />
                    </Grid>
                </Grid>
                : <div/>
            }
        </Container>
    )
}

export default Channel;
