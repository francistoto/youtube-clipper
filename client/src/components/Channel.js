import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import ChannelAPI from '../api/ChannelAPI';
import PlayerWrapper from './player/PlayerWrapper';

const Channel = ({ channelId }) => {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const [videoIndex, setVideoIndex] = useState(0);
    const [currentVideo, setCurrentVideo] = useState({});
    const [isLoadingChannel, setIsLoadingChannel] = useState(true);

    const handleEnded = useCallback(() => {
        const newVideoIndex = videoIndex < videos.length ? videoIndex + 1 : 0;

        setVideoIndex(newVideoIndex);
        setCurrentVideo(videos[newVideoIndex])
    });

    useEffect(async () => {
        if (isLoadingChannel) {
            const channelResponse = await ChannelAPI.getChannelById(channelId);

            setChannel(channelResponse);
            setVideos(channelResponse.videos);
            setCurrentVideo(channelResponse.videos[videoIndex])
            setIsLoadingChannel(false);
        }
    }, [channel, currentVideo, isLoadingChannel]);

    const refreshChannel = useCallback(() => {
        setIsLoadingChannel(true);
    }, [isLoadingChannel])

    return (
        <Container>
            <Grid container justify='center'>
                <Grid item xs={10}>
                    <PlayerWrapper
                        channelId={channelId}
                        videos={videos}
                        currentVideo={currentVideo}
                        handleEnded={handleEnded}
                        refreshChannel={refreshChannel}
                    />
                </Grid>
            </Grid>
            {/* <PlayerWindow videos={videos} channelId={channelId} userId={3}/> */}
            {/* <ReactPlayerDemo /> */}
        </Container>
    )
}

export default Channel;
