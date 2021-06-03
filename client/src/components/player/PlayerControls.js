import React, { useState } from 'react';
import { Button, Grid, Slider } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import Moment from './Moment';

const PlayerControls = ({
    played,
    player,
    playing,
    currentVideo,
    videoList,
    videoIndex,
    setPlayed,
    setPlaying,
    setSeeking,
    setVideoIndex,
    handleCreateMoment
}) => {
    const [momentStart, setMomentStart] = useState({});
    const [recording, setRecording] = useState(false);

    const handlePlayPause = () => {
        setPlaying((playing) => !playing);
    };

    const handleSeekMouseDown = e => {
        setSeeking(true);
    };

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = e => {
        setSeeking(false);
        player.current.seekTo(e.target.value);
        setPlaying(true);
    };
    
    const handleSkipForward = () => {
        if (videoIndex < videoList.length - 1) {
            setVideoIndex(videoIndex + 1);
        } else {
            setVideoIndex(0);
        }
        setPlayed(0);
        setPlaying(true);
    };
    
    const handleSkipPrevious = () => {
        if (videoIndex > 0) {
            setVideoIndex(videoIndex - 1);
        } else {
            setVideoIndex(videoList.length - 1);
        }
        setPlaying(true);
    };

    const handleStartMoment = () => {
        const startTime = player.current.getCurrentTime();

        setMomentStart({ startTime, videoId: currentVideo.id });
        setRecording(true);
    }

    const handleStopMoment = () => {
        const stopTime = player.current.getCurrentTime();

        handleCreateMoment(momentStart, { stopTime, videoId: currentVideo.id });
        setMomentStart({});
        setRecording(false);
    }

    const renderPlayPauseButton = () => {
        if (!playing) {
            return <PlayArrowIcon color='secondary' fontSize='large'/>;
        }
    
        return <PauseIcon color='secondary' fontSize='large'/>
    }

    const renderRecordButton = () => {
        if (!playing) {
            return <PlayCircleOutlineIcon color='secondary' fontSize='large'/>;
        }
        return <PlayCircleFilledIcon color='secondary' fontSize='large'/>;
    };

    const renderMoments = () => {
        const moments = currentVideo?.moments;
        if (moments && moments.length) {
            return moments.map((moment) =>
                <Moment key={`moment-${moment.id}`} moment={moment} player={player} />
            );
        }
    };

    const renderTime = (totalSeconds) => {
        if (totalSeconds !== null) {
            let wholeSeconds = Math.round(totalSeconds); // 347
    
            const hours = Math.floor(totalSeconds / 3600);
            wholeSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = wholeSeconds % 60;
    
            const displayHours = hours <= 0 ? '' : `${hours}:`;
            const displayMinutes = hours > 0 ? `0${minutes}` : minutes;
            const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    
            return `${displayHours}${displayMinutes}:${displaySeconds}`;
        }

        return '';
    }

    return (
        <div className='player-controls'>
            <div className='timeline-slider'>
                <div id='moments'>
                    {renderMoments()}
                </div>
                <input
                    type='range'
                    min={0}
                    max={0.999999}
                    step='any'
                    style={{ width: '100%' }}
                    className='slider'
                    value={played || 0}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
            </div>
            <Grid container justify='center' align='center'>
                <Grid item xs={4} align='left' style={{ color: 'white' }}>
                    {player && renderTime(player?.current?.getCurrentTime())}
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handleSkipPrevious}><SkipPreviousIcon color='secondary' fontSize='large' /></Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handlePlayPause}>{renderPlayPauseButton()}</Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handleSkipForward}><SkipNextIcon color='secondary' fontSize='large' /></Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    {!recording
                        ? <Button 
                            color='secondary'
                            onClick={handleStartMoment}>
                                <PlayCircleOutlineIcon color='secondary' fontSize='large'/>
                        </Button>
                        :  <Button 
                            color='secondary'
                            onClick={handleStopMoment}>
                                <PlayCircleFilledIcon color='secondary' fontSize='large'/>
                        </Button>
                    }
                </Grid>
                <Grid item xs={4} align='right' style={{ color: 'white' }}>
                    {player && renderTime(player?.current?.getDuration())}
                </Grid>
            </Grid>
        </div>
    );
};

export default PlayerControls;
