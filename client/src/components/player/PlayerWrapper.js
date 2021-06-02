import React, { useContext, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player';

import PlayerControls from './PlayerControls';

import MomentAPI from '../../api/MomentAPI';
import useStateCallback from '../../api/lib/useStateCallback';

import AuthContext from '../../contexts/auth';

const YOUTUBE_CONFIG = {
    playerVars: {
        iv_load_policy: 3,
        disablekb: true,
        rel: 0
    }
}

const PlayerWrapper = ({ channelId, videos }) => {
    const [videoList, setVideoList] = useState(null);
    const [videoIndex, setVideoIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [controls, setControls] = useStateCallback(false);
    const [light, setLight] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(null);
    const [loaded, setLoaded] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [loadedSeconds, setLoadedSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
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

    const handleToggleControls = () => {
        const url = state.url
        setControls(controls => !controls, () => {
            setVideoList(url);
            setPlayed(0);
            setLoaded(0);
        });
        setVideoList(null);
    };

    const handleToggleLight = () => {
        setLight(!light);
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

            setLoaded(loaded);
            setPlayedSeconds(playedSeconds);
            setLoadedSeconds(loadedSeconds);
        }
    };

    const handleEnded = () => {
        console.log('onEnded');
        if (videoIndex < videoList.length - 1) {
            setVideoIndex(videoIndex + 1);
        } else {
            setVideoIndex(0);
        }
        setPlaying(true);
    };

    const handleDuration = (duration) => {
        console.log('onDuration', duration);
        setDuration(duration);
    };

    const handleCreateMoment = async (startTime, stopTime) => {
        const newMoment = {
            startTime,
            stopTime,
            videoId: videos[videoIndex].id,
            channelId,
            createdByUser: currentUser.id
        };
        const createdMoment = await MomentAPI.createMoment(newMoment);

        console.log('createdMoment: ', createdMoment);
    }

    const handleClickFullscreen = () => {
        screenfull.request(findDOMNode(player.current))
    };

    return (
        <div>
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
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
                <PlayerControls
                    played={played}
                    player={player}
                    playing={playing}
                    videoList={videoList}
                    videoIndex={videoIndex}
                    setSeeking={setSeeking}
                    setPlayed={setPlayed}
                    setPlaying={setPlaying}
                    setVideoIndex={setVideoIndex}
                    handleCreateMoment={handleCreateMoment}
                />
            </div>
        </div>
    );
};

export default PlayerWrapper;
