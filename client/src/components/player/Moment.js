import { ClickAwayListener, Fade, Grid, IconButton, Paper, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React, { useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1),
        backgroundColor: 'gray'
    },
    popper: {
        zIndex: 2000,
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: "-0.71em",
            marginLeft: 4,
            marginRight: 4,
            "&::before": {
                transformOrigin: "0 100%"
            }
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: "-0.71em",
            marginLeft: 4,
            marginRight: 4,
            "&::before": {
                transformOrigin: "100% 0"
            }
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: "-0.71em",
            height: "1em",
            width: "0.71em",
            marginTop: 4,
            marginBottom: 4,
            "&::before": {
                transformOrigin: "100% 100%"
            }
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: "-0.71em",
            height: "1em",
            width: "0.71em",
            marginTop: 4,
            marginBottom: 4,
            "&::before": {
                transformOrigin: "0 0"
            }
        }
    },
    arrow: {
        overflow: 'hidden',
        position: 'absolute',
        width: '1em',
        height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
        boxSizing: 'border-box',
        color: 'gray',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: '100%',
            height: '100%',
            boxShadow: theme.shadows[1],
            backgroundColor: 'currentColor',
            transform: 'rotate(45deg)'
        }
      }
}));

const Moment = ({ moment, player}) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [arrowRef, setArrowRef] = useState(null);
    const momentWidth = (moment.stopTime - moment.startTime) / player.current.getDuration();
    const momentLeftOffset = moment.startTime / player.current.getDuration();
    const classes = useStyles();

    const handleShowPopper = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleLike = () => {
        console.log('Moment liked!');
    }

    const handleIgnore = () => {
        console.log('Moment ignored');
    }

    return (
        <div>
            <Popper
                open={open}
                anchorEl={anchorEl}
                className={classes.popper}
                modifiers={{
                    flip: {
                        enabled: true
                    },
                    arrow: {
                        enabled: true,
                        element: arrowRef
                    },
                    offset: {
                        enabled: true,
                        offset: '0, 10'
                    }
                }}
                placement='bottom'
                transition
            >
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.typography}>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <div>
                                    <span className={classes.arrow} ref={setArrowRef} />
                                    <Grid container align='center' justify='center'>
                                        <Grid item xs={6}>
                                            <IconButton onClick={handleLike}>
                                                <ThumbUpIcon color='primary' />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <IconButton onClick={handleIgnore}>
                                                <ThumbDownIcon color='primary' />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <div
                className='moment'
                style={{
                    left: `${momentLeftOffset * 100}%`,
                    width: `${momentWidth * 100}%`
                }}
                onClick={handleShowPopper}
            />
        </div>
    );
};

export default Moment;
