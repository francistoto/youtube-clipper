import React, { useContext, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { store } from 'react-notifications-component';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player';

import PlayerControls from './PlayerControls';

import MomentAPI from '../../api/MomentAPI';

import AuthContext from '../../contexts/AuthContext';
import Comments from './Comments';

const YOUTUBE_CONFIG = {
    playerVars: {
        iv_load_policy: 3,
        disablekb: true,
        rel: 0
    }
};

const BASE_NOTIFICATION_OPTIONS = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 5000,
        onScreen: false
    }
};

const MOMENT_OVERLAP_BUFFER = 1;

const PlayerWrapper = ({ channelId, videos, refreshChannel }) => {
    const [videoList, setVideoList] = useState(null);
    const [videoIndex, setVideoIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(null);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [loop, setLoop] = useState(false);
    const [seeking, setSeeking] = useState(false);

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const videoUrls = videos.map((video) => `https://www.youtube.com/watch?v=${video.url}`);

        setVideoList(videoUrls);
    }, [videos])

    const player = useRef(null);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleStop = () => {
        setVideoList(null);
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
        console.log('onPlay');
        setPlaying(true);
    };

    const handlePause = () => {
        console.log('onPause');
        setPlaying(false);
    };

    const handleProgress = ({ played: progressPlayed, playedSeconds, loaded, loadedSeconds }) => {
        // We only want to update time slider if we are not currently seeking
        if (!seeking) {
            if (played < .999999) {
                setPlayed(progressPlayed);
            }
        }
    };

    const handleEnded = () => {
        if (videoIndex < videoList.length - 1) {
            setVideoIndex(videoIndex + 1);
        } else {
            setVideoIndex(0);
        }
        setPlayed(0);
        setPlaying(true);
    };

    const checkForMomentOverlap = (newMoment) => {
        const { moments } = videos[videoIndex];

        return moments.reduce((overlap, moment) => {
            // Establish validation for timestamp locations relative to the current moment with a buffer of 1 second
            const startBefore = newMoment.startTime < (moment.startTime - MOMENT_OVERLAP_BUFFER);
            const startDuring = newMoment.startTime > (moment.startTime - MOMENT_OVERLAP_BUFFER) &&
                                newMoment.startTime < (moment.stopTime + MOMENT_OVERLAP_BUFFER);
            const stopAfter = newMoment.stopTime > (moment.stopTime + MOMENT_OVERLAP_BUFFER);
            const stopDuring = newMoment.stopTime > (moment.startTime - MOMENT_OVERLAP_BUFFER) &&
                               newMoment.stopTime < (moment.stopTime + MOMENT_OVERLAP_BUFFER);

            // Set cases for determining moment overlap
            const case1 = startBefore && stopAfter;
            const case2 = startBefore && stopDuring;
            const case3 = startDuring && stopAfter;
            const case4 = startDuring && stopDuring;

            if (case1 || case2 || case3 || case4) {
                return true;
            }

            return overlap;
        }, false);
    }

    const handleCreateMoment = async (momentStart, momentStop) => {
        const { startTime, videoId: startVideoId } = momentStart;
        const { stopTime, videoId: stopVideoId } = momentStop;

        const newMoment = {
            startTime,
            stopTime,
            videoId: videos[videoIndex].id,
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
        } else if (checkForMomentOverlap(newMoment)) {
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
                message: `From ${startTime.toFixed(2)} to ${stopTime.toFixed(2)} on video ${videos[videoIndex].id}.`,
                type: "success",
                ...BASE_NOTIFICATION_OPTIONS
            });
    
            refreshChannel();
        }
    }

    const handleClickFullscreen = () => {
        screenfull.request(findDOMNode(player.current))
    };

    const renderPlayerControls = () => {
        if (player.current) {
            return (
                <PlayerControls
                    played={played}
                    player={player}
                    playing={playing}
                    currentVideo={videos && videos[videoIndex]}
                    videoList={videoList}
                    videoIndex={videoIndex}
                    setSeeking={setSeeking}
                    setPlayed={setPlayed}
                    setPlaying={setPlaying}
                    setVideoIndex={setVideoIndex}
                    handleCreateMoment={handleCreateMoment}
                />
            );
        }

        return null;
    }

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
                url={videoList && videoList[videoIndex]}
                playing={playing}
                controls={false}
                light={false}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                progressInterval={1000}
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={handlePlay}
                onPause={handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onEnded={handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={handleProgress}
            />
            {renderPlayerControls()}
            <Comments />
        </div>
    );
};

export default PlayerWrapper;
