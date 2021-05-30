import React, { useState } from 'react';
import { Slider } from '@material-ui/core';

const PlayerControls = ({ played, player, seeking, setPlayed, setSeeking }) => {
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

    return (
        <div className='player-controls'>
            {/* <Slider
                min={0} max={0.999999}
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
            /> */}
            <input
                type='range'
                min={0}
                max={0.999999}
                step='any'
                style={{ width: '100%' }}
                value={played || 0}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
            />
        </div>
    );
};

export default PlayerControls;
