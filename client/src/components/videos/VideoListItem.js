import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    ListItem,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        marginBottom: theme.spacing(1),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 4
    },
    content: {
        flexGrow: 2
    },
    actions: {
        display: 'flex',
        alignItems: 'flex-end',
    }
}));

const VideoListItem = ({ video }) => {
    const classes = useStyles();

    return (
        <ListItem component={Card} className={classes.root}>
            {video.thumbnail.length > 0 &&
                <img src={video.thumbnail} />
            }
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant='h6'>{video.title}</Typography>
                    <Typography variant='subtitle1'>Platform: {video.platform}</Typography>
                </CardContent>
            </div>
            <CardActions className={classes.actions}>
                <IconButton>
                    <ForwardIcon fontSize='large' />
                </IconButton>
            </CardActions>
        </ListItem>
    );
};

export default VideoListItem;
