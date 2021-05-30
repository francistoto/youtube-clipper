import React, { useState } from 'react';

const PlayerControlsOld = ({ handleSeekTo, offset, setOffset, player, playHead, seeking, setSeeking, totalTime }) => {
    // const playHead = document.getElementById('playHead');
    const timeline = document.getElementById('timeline');
    const controls = document.getElementById('playerControls');

    // drag playhead left and right
    const handleMouseMove = (e) => {
        const userOffset = (e.clientX - (timeline.offsetLeft + controls.offsetLeft)) / timeline.offsetWidth;

        if (userOffset > 1) {
            setOffset(1);
        }
    
        if (userOffset < 0) {
            setOffset(0);
        }
    
        if (seeking) {
            const offsetString = `${(userOffset * 100)}%`;
            playHead.style.left = offsetString;
            setOffset(userOffset);
        }
    }

    // enable playhead drag
    const handleMouseDown = () => {
        setSeeking(true);
    }

    // disable playhead drag
    const handleMouseUp = () => {
        const { current: { internalPlayer } } = player;
        setSeeking(false);

        const seekTime = totalTime * offset;

        internalPlayer.seekTo(seekTime, true);
    }

    return (
        <div>
            <section className="player-controls" id="playerControls" onMouseMove={handleMouseMove}>
                <div className="timeline" id="timeline">
                    {/* <div id="moments" onClick={this.clickLikeForComment}/> */}
                    <div
                        className="playHead"
                        id="playHead"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
                </div>
            </section>
        </div>
    );
};

export default PlayerControlsOld;
