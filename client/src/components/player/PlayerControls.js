import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import Moment from './Moment';

import { renderTime } from './helpers';

const PlayerControls = ({
    currentVideo,
    duration,
    played,
    playedSeconds,
    player,
    playing,
    setPlayed,
    setPlaying,
    setSeeking,
    handleCreateMoment,
    handleSkip
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

    const handleStartMoment = () => {
        const startTime = player.current.getCurrentTime() - 1;

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
        if (!recording) {
            return (
                <Button 
                    color='secondary'
                    onClick={handleStartMoment}>
                        <PlayCircleOutlineIcon color='secondary' fontSize='large'/>
                </Button>
            )
        }

        return (
            <Button 
                color='secondary'
                onClick={handleStopMoment}>
                    <PlayCircleFilledIcon color='secondary' fontSize='large'/>
            </Button>
        );
    };

    const renderMoments = () => {
        const moments = currentVideo?.moments;
        if (moments && moments.length) {
            return moments.map((moment) =>
                <Moment key={`moment-${moment.id}`} moment={moment} duration={duration} />
            );
        }
    };

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
                    <Typography>
                        {renderTime(playedSeconds)}
                    </Typography>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={() => handleSkip('previous')}><SkipPreviousIcon color='secondary' fontSize='large' /></Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handlePlayPause}>{renderPlayPauseButton()}</Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={() => handleSkip('next')}><SkipNextIcon color='secondary' fontSize='large' /></Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    {renderRecordButton()}
                </Grid>
                <Grid item xs={4} align='right' style={{ color: 'white' }}>
                    <Typography>
                        {renderTime(duration)}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default PlayerControls;
