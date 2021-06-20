import React from 'react';
import {
    CardActions,
    CardContent,
    IconButton,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import VideoAPI from '../../api/VideoAPI';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    content: {
        flexGrow: 2
    },
    actions: {
        alignItems: 'flex-end',
    }
});

const VideoListItem = ({ deletable, video, setIsLoadingChannels }) => {
    const classes = useStyles();

    const handleDelete = async () => {
        await VideoAPI.deleteVideo(video.id);

        setIsLoadingChannels(true);
    }

    return (
        <div className={classes.root}>
            {video.thumbnail.length > 0 &&
                <img src={video.thumbnail} />
            }
            <CardContent className={classes.content}>
                <Typography variant='h6'>{video.title}</Typography>
                <Typography variant='subtitle1'>Platform: {video.platform}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                {deletable &&
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon fontSize='large' />
                    </IconButton>
                }
            </CardActions>
        </div>
    );
};

export default VideoListItem;
