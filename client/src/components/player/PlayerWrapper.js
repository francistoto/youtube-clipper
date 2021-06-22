import React, { useContext, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { useHistory, useParams } from 'react-router-dom';
import { store } from 'react-notifications-component';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player';

import Comments from './Comments';
import PlayerControls from './PlayerControls';

import MomentAPI from '../../api/MomentAPI';

import AuthContext from '../../contexts/AuthContext';

import { YOUTUBE_CONFIG, BASE_NOTIFICATION_OPTIONS } from './constants';
import { checkForMomentOverlap, getVideoUrl } from './helpers';

const PlayerWrapper = ({ channelId, videos, setIsLoadingChannel }) => {
    const [currentVideo, setCurrentVideo] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(null);
    const [playedSeconds, setPlayedSeconds] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [loop, setLoop] = useState(false);
    const [seeking, setSeeking] = useState(false);

    const { user: currentUser } = useContext(AuthContext);

    const { channelId, videoId } = useParams();

    const history = useHistory();
    
    const player = useRef(null);
    
    useEffect(() => {
        const thisVideo = videos.find((video) => video.id === parseInt(videoId));

        setCurrentVideo(thisVideo);
    }, [videoId, videos]);

    const handleReady = () => {
        console.log('onReady');
    };

    const handleStart = () => {
        console.log('onStart');
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleStop = () => {
        setCurrentVideo(null);
        setPlaying(false);
    };

    const handleToggleLoop = () => {
        setLoop(!loop);
    };

    const handleVolumeChange = e => {
        setVolume(parseFloat(e.target.value));
    };

    const handleToggleMuted = () => {
        setMuted(!muted);
    };

    const handleSetPlaybackRate = e => {
        setPlaybackRate(e.target.value);
    };

    const handlePlay = () => {
        setPlaying(true);
    };

    const handlePause = () => {
        setPlaying(false);
    };

    const handleProgress = ({ played: progressPlayed, playedSeconds, loaded, loadedSeconds }) => {
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            if (played < .999999) {
                setPlayed(progressPlayed);
                setPlayedSeconds(playedSeconds);
            }
        }
    };

    const handleSkip = (direction) => {
        setDuration(null);
        setPlayedSeconds(null);
        
        const videoIds = videos.map((video) => video.id);
        let videoIndex = videoIds.indexOf(currentVideo.id);

        if(direction === 'next') {
            if (videoIndex < videos.length - 1) {
                videoIndex++
            } else {
                videoIndex = 0;
            }
        } else {
            if (videoIndex > 0) {
                videoIndex--
            } else {
                videoIndex = videos.length - 1;
            }
        }
        
        history.push(`/channel/${channelId}/video/${videos[videoIndex].id}`);

        setPlayed(0);
        setPlaying(true);
    };

    const handleCreateMoment = async (momentStart, momentStop) => {
        const { startTime, videoId: startVideoId } = momentStart;
        const { stopTime, videoId: stopVideoId } = momentStop;
        const { moments } = currentVideo;

        const newMoment = {
            startTime,
            stopTime,
            videoId: currentVideo.id,
            channelId,
            createdByUser: currentUser.id
        };

        if (startVideoId !== stopVideoId) {
            store.addNotification({
                title: "Invalid moment",
                message: 'Moments cannot span multiple videos',
                type: "danger",
                ...BASE_NOTIFICATION_OPTIONS
            });
        } else if (startTime > stopTime) {
            store.addNotification({
                title: "Invalid moment",
                message: 'Moment must start before it ends',
                type: "danger",
                ...BASE_NOTIFICATION_OPTIONS
            });
        } else if (checkForMomentOverlap(newMoment, moments)) {
            store.addNotification({
                title: "Invalid moment",
                message: 'Moments cannot overlap each other',
                type: "danger",
                ...BASE_NOTIFICATION_OPTIONS
            });
        } else {
            await MomentAPI.createMoment(newMoment);
            
            store.addNotification({
                title: "Moment created!",
                message: `From ${startTime.toFixed(2)} to ${stopTime.toFixed(2)} on video ${currentVideo.id}.`,
                type: "success",
                ...BASE_NOTIFICATION_OPTIONS
            });
    
            setIsLoadingChannel(true);
        }
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const handleClickFullscreen = () => {
        screenfull.request(findDOMNode(player.current))
    };

    const renderPlayerControls = () => {
        if (player.current) {
            return (
                <PlayerControls
                    duration={duration}
                    played={played}
                    playedSeconds={playedSeconds}
                    player={player}
                    playing={playing}
                    currentVideo={currentVideo}
                    setSeeking={setSeeking}
                    setPlayed={setPlayed}
                    setPlaying={setPlaying}
                    handleCreateMoment={handleCreateMoment}
                    handleSkip={handleSkip}
                />
            );
        }

        return null;
    };

    return (
        <div className='player-wrapper'>
            <ReactPlayer
                ref={player}
                className='player'
                width='100%'
                height='100%'
                config={{
                    youtube: YOUTUBE_CONFIG
                }}
                url={currentVideo && getVideoUrl(currentVideo)}
                playing={playing}
                controls={false}
                light={false}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                progressInterval={1000}
                onReady={handleReady}
                onStart={handleStart}
                onPlay={handlePlay}
                onPause={handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onEnded={() => handleSkip('next')}
                onError={e => console.log('onError', e)}
                onProgress={handleProgress}
                onDuration={handleDuration}
            />
            {renderPlayerControls()}
            <Comments />
        </div>
    );
};

export default PlayerWrapper;
