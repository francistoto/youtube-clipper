import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Accordion,
    AccordionActions,
    Avatar,
    IconButton,
    Typography
} from '@material-ui/core';
import MuiAccordionDetails from '@material-ui/core/AccordionSummary';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForwardIcon from '@material-ui/icons/Forward';
import VideocamIcon from '@material-ui/icons/Videocam';

import ChannelActions from './ChannelActions';
import VideoList from '../videos/VideoList';

const useStyles = makeStyles((theme) => ({
    channelDetails: {
        flexGrow: 2,
        marginLeft: theme.spacing(2),
    },
    avatar: {
        padding: theme.spacing(2)
    },
    summary: {
        cursor: 'pointer',
    },
    summaryContentText: {
        flexGrow: 4,
        padding: theme.spacing(3)
    },
    channelListItem: {
        backgroundColor: 'gray',
        margin: theme.spacing(1)
    }
}));

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        // marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
                minHeight: 56,
            },
        },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        marginTop: 0
    },
}))(MuiAccordionDetails);

const ChannelListItem = ({ channel, channelNames, setIsLoadingChannels }) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <Accordion
                className={classes.channelListItem}
                square
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label='Expand'
                >
                    <Avatar className={classes.avatar}>
                        <VideocamIcon fontSize='large' />
                    </Avatar>
                    <Typography className={classes.summaryContentText} variant='h4'>
                        {channel.name}
                    </Typography>
                </AccordionSummary>
                <AccordionActions>
                    <Typography className={classes.channelDetails} variant='h5'>Channel Details</Typography>
                    <IconButton
                        color='inherit'
                        aria-label='Forward'
                        onClick={() => { history.push(`/channel/${channel.id}`); }}
                    >
                        <ForwardIcon fontSize='large' />
                    </IconButton>
                    <ChannelActions
                        channel={channel}
                        channelNames={channelNames}
                        setIsLoadingChannels={setIsLoadingChannels}
                    />
                </AccordionActions>
                <AccordionDetails>
                    <VideoList deletable videos={channel.videos} setIsLoadingChannels={setIsLoadingChannels} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ChannelListItem;
