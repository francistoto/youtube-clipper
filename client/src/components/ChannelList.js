import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
    channelListItem: {
        width: '100%',
        margin: theme.spacing(1),
        cursor: 'pointer',
        backgroundColor: 'gray'
    }
}));

const ChannelList = ({ channels }) => {
    const classes = useStyles();

    const history = useHistory();

    return (
        <List>
            {channels.map((channel, index) => (
                <ListItem
                    // component={Card}
                    key={`${channel.name}`}
                    className={classes.channelListItem}
                    onClick={() => { history.push(`/channel/${channel.id}`); }}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <VideocamIcon fontSize='large' />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography variant='h5'>{channel.name}</Typography>}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ChannelList;
