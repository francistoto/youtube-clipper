import React, { useState } from 'react';
import {
    Card,
    List,
    ListItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoListItem from './VideoListItem';

const useStyles = makeStyles((theme) => ({
    videoList: {
        width: '100%',
        margin: theme.spacing(1),
        marginTop: -1
    },
    videoListItem: {
        width: '100%',
        marginBottom: theme.spacing(1),
    }
}));

const VideoList = ({ deletable, selectable, videos, selectedVideos, handleSelect, setIsLoadingChannels }) => {
    const classes = useStyles();

    return (
        <List className={classes.videoList}>
            {videos.length > 0 &&
                videos.map((video, index) => (
                    <ListItem
                        key={index}
                        component={Card}
                        className={classes.videoListItem}
                        onClick={selectable && ((event) => handleSelect(event, index))}
                        selected={selectable && selectedVideos.includes(index)}
                    >
                        <VideoListItem
                            deletable={deletable}
                            video={video}
                            setIsLoadingChannels={setIsLoadingChannels}
                        />
                    </ListItem>
                ))
            }
        </List>
    );
};

export default VideoList;