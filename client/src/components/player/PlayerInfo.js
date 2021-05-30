import React, { useContext, useState } from 'react';
import { sendMoment, Moment } from '../../api/videoModel.js';
import $ from '../../api/lib/jquery';
import AuthContext from '../../contexts/auth';

const PlayerInfo = ({ channelId, currentVideo, player, totalTime }) => {
    const { user } = useContext(AuthContext);
    const [extreme, setExtreme] = useState(false);
    const [extremeStart, setExtremeStart] = useState(0);
    const [momentList, setMomentList] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [extremeStop, setExtremeStop] = useState(0);

    const playHead = document.getElementById('playHead');
    const timeline = document.getElementById('timeline');
    const controls = document.getElementById('playerControls');

    let extremeClip = '';

    // create a new highlight in currently playing video
    const handleExtreme = (e) => {
        const { current: { internalPlayer } } = player;

        if (!extreme) {
            setExtreme(true);
            e.target.classList.add('alert');

            if (extremeStart) {
                setExtremeStart(internalPlayer.getCurrentTime());

                extremeClip = $('<div/>').addClass('moment').addClass('extreme');
                $('#moments').append(extremeClip);
            }
        } else {
            setExtreme(false);
            setExtremeStop(internalPlayer.getCurrentTime());

            e.target.classList.remove('alert');
            const endTime = internalPlayer.getCurrentTime();

            const newMoment = {
                start_time: Math.ceil(extremeStart - 1),
                stop_time: Math.ceil(endTime),
                video_id: currentVideo.id,
                channel_id: currentVideo.channelId
            };

            sendMoment(newMoment, user).then((resp) => {
                const newMoment = Moment($('<div>').html(''), resp, internalPlayer, user.id);
                const mWidth = (resp.stop_time - resp.start_time) / totalTime;
                const mLeft = resp.start_time / totalTime;
                $('#moments .extreme').hide();
                $('#moments').append(newMoment.render);
                const newMomentList = momentList.concat(newMoment);
                newMoment.render.addClass('moment');
                newMoment.render.css({
                    left: `${mLeft * 100}%`,
                    width: `${mWidth * 100}%`,
                });

                setMomentList(newMomentList);
                setExtremeStart(0);
                setExtremeStop(0);
            });
        }

        console.log(extreme);
    }

    // skip to next video
    const handleLame = () => {
        const { current: { internalPlayer } } = player;

        internalPlayer.seekTo(internalPlayer.getDuration());
    }

    // chooses whether to render the "Extreme" button or not
    const renderButtons = () => {
        return (channelId === 0 || channelId === 'default' || user.id === null)
        ? <div className="player-buttons small-6 columns">
            <button className="button alert" onClick={handleLame}>
                <i className="fa fa-thumbs-down" />
                Lame
            </button>
            <h3 className="totLike">Total Likes: {totalLikes} </h3>
        </div>
        : <div className="player-buttons small-6 columns">
            <button
                className="button"
                onClick={handleExtreme}
            >
                <i className="fa fa-thumbs-up" />
                {this.state.extreme ? 'Extreme Stop' : 'Extreme Start'}
            </button>
            <button className="button alert" onClick={handleLame}>
                <i className="fa fa-thumbs-down" />
                Lame
            </button>
            <h3 className="totLike">Total Highlights: {totalLikes} </h3>
        </div>;
    }

    return (
        <div>        
            <section className="player-info row">
                <div id="stats" className="small-6 columns">
                <div>
                    <span id="timeElapsed" /> / <span id="totalTime" />
                </div>
                <div id="percentageComplete" />
                </div>
                {/* { this.renderButtons() } */}
            </section>
        </div>
    );
};

export default PlayerInfo;