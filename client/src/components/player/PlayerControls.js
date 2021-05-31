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
    setPlayed,
    setPlaying,
    setSeeking
}) => {
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
                    <Button color='secondary' onClick={handlePlayPause}><SkipPreviousIcon color='secondary' fontSize='large' /></Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handlePlayPause}>{renderPlayPauseButton()}</Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handlePlayPause}>{renderRecordButton()}</Button>
                </Grid>
                <Grid item xs={1} align='center'>
                    <Button color='secondary' onClick={handlePlayPause}><SkipNextIcon color='secondary' fontSize='large' /></Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default PlayerControls;
