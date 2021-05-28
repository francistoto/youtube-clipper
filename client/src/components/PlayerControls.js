import React, { useState } from 'react';

const PlayerControls = ({ player }) => {
    const [seek, setSeek] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [offset, setOffset] = useState(0);

    const playHead = document.getElementById('playHead');
    const timeline = document.getElementById('timeline');
    const controls = document.getElementById('playerControls');

    // drag playhead left and right
    const handleMouseMove = (e) => {
      const userOffset = (e.clientX - (timeline.offsetLeft + controls.offsetLeft));
      offset = (userOffset) / timeline.offsetWidth;
      if (offset > 1) {
        setOffset(1);
      }
  
      if (offset < 0) {
        setOffset(0);
      }
  
      if (seek) {
        const offsetString = `${(offset * 100)}%`;
        playHead.style.left = offsetString;
      }
    }

    // enable playhead drag
    const handleMouseDown = () => {
        setSeek(true);
    }

    // disable playhead drag
    const handleMouseUp = () => {
        setSeek(false);

        const seekTime = totalTime * offset;
        player.seekTo(seekTime, true);
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

export default PlayerControls;
