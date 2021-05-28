import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';

import YouTube from 'react-youtube';

import ChannelAPI from '../api/ChannelAPI';
import PlayerControls from './PlayerControls';

const Channel = ({ channelId }) => {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState({});
    const [isLoadingChannel, setIsLoadingChannel] = useState(true);
    let player = '';

    useEffect(async () => {
        if (isLoadingChannel) {
            console.log('channelId: ', channelId);
            const channelResponse = await ChannelAPI.getChannelById(channelId);

            console.log('channelResponse: ', channelResponse);
    
            setChannel(channelResponse);
            setVideos(channelResponse.videos);
            setCurrentVideo(channelResponse.videos[0])
            setIsLoadingChannel(false);
        }
    }, [channel, isLoadingChannel]);

    // render either a spinner or youtube component
    const renderVideo = () => {
        const opts = {
            height: '500',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                controls: 0, // hide player controls
                // start: 10, // set player start time
                // end: 20, // set player end time
                iv_load_policy: 3, // hide annotations
                rel: 0, // hide related videos
                showinfo: 0, // hide video title
            },
        };
    
        if (!currentVideo.url) {
            return <CircularProgress />;
        }
    
        return (
            <YouTube
                videoId={currentVideo.url}
                opts={opts}
                //   onReady={this.handleReadyState}
                //   onStateChange={this.handleStateChange}
                //   onEnd={this.handleEnd}
                //   onPlay={this.handlePlay}
                className="player"
            />
        );
    }

    return (
        <Container>
            <Typography variant='h4'>{`Welcome to the ${channel.name} channel!`}</Typography>
            { renderVideo() }
            {/* <PlayerControls /> */}
        </Container>
    )
}

export default Channel;
