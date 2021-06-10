import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

import ChannelAPI from '../api/ChannelAPI';
import PlayerWrapper from './player/PlayerWrapper';

const Channel = () => {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const [isLoadingChannel, setIsLoadingChannel] = useState(true);

    const { channelId } = useParams();

    useEffect(async () => {
        if (isLoadingChannel) {
            try {
                const channelResponse = await ChannelAPI.getChannelById(channelId);
                console.log('channelResponse: ', channelResponse);
    
                setChannel(channelResponse);
                setVideos(channelResponse.videos);
            } catch {
                setChannel({});
                setVideos([]);
            }

            setIsLoadingChannel(false);
        }
    }, [channel, isLoadingChannel]);

    const refreshChannel = useCallback(() => {
        setIsLoadingChannel(true);
    }, [isLoadingChannel]);

    console.log('videos: ', videos);

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
