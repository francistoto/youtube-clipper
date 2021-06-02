import React, { useState } from 'react';
import { Button, Grid, Slider } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

const PlayerControls = ({
    played,
    player,
    playing,
    videoList,
    videoIndex,
    setPlayed,
    setPlaying,
    setSeeking,
    setVideoIndex,
    handleCreateMoment
}) => {
    const [momentStart, setMomentStart] = useState(0);
    const [momentStop, setMomentStop] = useState(0);
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
    };
    
    const handleSkipForward = () => {
        if (videoIndex < videoList.length - 1) {
            setVideoIndex(videoIndex + 1);
        } else {
            setVideoIndex(0);
        }
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
        const start = player.current.getCurrentTime();
        console.log('start: ', start);
        setMomentStart(start);
        setRecording(true);
    }

    const handleStopMoment = () => {
        const stop = player.current.getCurrentTime();
        console.log('stop: ', stop);
        console.log('moment: ', momentStart, stop);
        handleCreateMoment(momentStart, stop);
        setMomentStop(stop);
        setMomentStart(0);
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

    return (
        <div className='player-controls'>
            {/* <Slider
                min={0} max={0.999999}
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
            /> */}
            <div className='timeline-slider'>
                <div id='moments' />
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
            </Grid>
        </div>
    );
};

export default PlayerControls;
