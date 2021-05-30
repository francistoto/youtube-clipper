import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import YouTubePlayer from 'youtube-player';
import $ from '../api/lib/jquery';

import YouTube from 'react-youtube';

import PlayerControls from './PlayerControls';

import { sendMoment, Moment, getMoreVideos } from '../api/videoModel.js';

import AuthContext from '../contexts/auth';
import PlayerInfo from './PlayerInfo';

const PlayerWrapper = ({ channelId, currentVideo, handleEnd }) => {
    const { user } = useContext(AuthContext);
    const [offset, setOffset] = useState(0);
    const [seek, setSeek] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [momentList, setMomentList] = useState([]);
    const [extremeStart, setExtremeStart] = useState(0);
    const [extremeStop, setExtremeStop] = useState(0);

    const player = useRef(null);

    let extremeClip;

    const playHead = document.getElementById('playHead');
    const timeline = document.getElementById('timeline');
    const controls = document.getElementById('playerControls');

    // ready state from player API
    const handleReadyState = (event) => {
        const { current: { internalPlayer } } = player;

        if (currentVideo) {
            // player state
            // 1 – unstarted
            // 0 – ended
            // 1 – playing
            // 2 – paused
            // 3 – buffering
            // 5 – video cued

            if (internalPlayer.getPlayerState() !== 2 && internalPlayer.getPlayerState() !== 1) {
                event.target.playVideo();
                event.target.mute();
            }

            setTotalTime(event.target.getDuration()),

            $('#moments').html('');

            if (currentVideo.moments.length) {
                currentVideo.moments.forEach(moment => {
                    const newMoment = Moment($('<div>').html(''), moment, internalPlayer, user.id);
                    const mWidth = (moment.stop_time - moment.start_time) / totalTime;
                    const mLeft = moment.start_time / totalTime;
                    $('#moments').append(newMoment.render);
                    momentList.push(newMoment);
                    newMoment.render.addClass('moment');
                    newMoment.render.css({
                        left: `${mLeft * 100}%`,
                        width: `${mWidth * 100}%`,
                    });
                });
            }
        }
    };

    const handleStateChange = (event) => {
        setTotalTime(event.target.getDuration());
    
        if (event.target.getPlayerState() === 1) {
            window.setInterval(() => {
                const percent = (event.target.getCurrentTime() / totalTime) * 100;
                const totalMinutes = (`${Math.floor(totalTime / 60)}`);
                const totalSeconds = (`0${Math.floor(totalTime % 60)}`).slice(-2);
                const currentMinutes = (`${Math.floor(event.target.getCurrentTime() / 60)}`);
                const currentSeconds = (`0${Math.floor(event.target.getCurrentTime() % 60)}`).slice(-2);
        
                $('#timeElapsed').html(`${currentMinutes}:${currentSeconds}`);
                $('#totalTime').html(`${totalMinutes}:${totalSeconds}`);
                $('#percentageComplete').html(`${Math.ceil(percent)}%`);
        
                // momentList.forEach(moment => {
                //     moment.hitTest(event.target.getCurrentTime());
                // });
        
                if (extremeClip) {
                    const clipEnd = extremeStop || event.target.getCurrentTime();
                    const clipWidth = (clipEnd - extremeStart) / totalTime;
                    const clipLeft = extremeStart / totalTime;
                    extremeClip.css({
                        left: `${clipLeft * 100}%`,
                        width: `${clipWidth * 100}%`,
                    });
                }
        
                if (!seek) {
                    playHead.style.left = `${percent}%`;
                }
            }, 1000);
        }
    
        if (event.target.getPlayerState() === 5) {
            event.target.playVideo();
        }
    
        handleReadyState(event);
    };

    // render either a spinner or youtube component
    const renderVideo = () => {
        const opts = {
            height: '450',
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
                ref={player}
                videoId={currentVideo.url}
                opts={opts}
                onReady={handleReadyState}
                onStateChange={handleStateChange}
                onEnd={handleEnd}
                //   onPlay={this.handlePlay}
                className="player"
            />
        );
    }

    return (
        <div>
            {renderVideo()}
            <PlayerControls
                offset={offset}
                setOffset={setOffset}
                player={player}
                playHead={playHead}
                seek={seek}
                setSeek={setSeek}
                totalTime={totalTime}
            />
            <PlayerInfo
                channelId={channelId}
                currentVideo={currentVideo}
                player={player}
                totalTime={totalTime}
            />
        </div>
    )
};

export default PlayerWrapper;
