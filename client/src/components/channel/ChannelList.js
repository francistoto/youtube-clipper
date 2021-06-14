import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForwardIcon from '@material-ui/icons/Forward';
import VideocamIcon from '@material-ui/icons/Videocam';
import ChannelAPI from '../../api/ChannelAPI';

const useStyles = makeStyles((theme) => ({
    channelListItem: {
        width: '100%',
        margin: theme.spacing(1),
        cursor: 'pointer',
        backgroundColor: 'gray'
    }
}));

const ChannelList = ({ channels, setIsLoadingChannels }) => {
    const classes = useStyles();

    const history = useHistory();

    const handleDelete = async (e, channelId) => {
        e.preventDefault();

        await ChannelAPI.deleteChannel(channelId);

        setIsLoadingChannels(true);
    };

    return (
        <List>
            {channels.map((channel, index) => (
                <ListItem
                    key={`${channel.name}`}
                    className={classes.channelListItem}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <VideocamIcon fontSize='large' />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography variant='h5'>{channel.name}</Typography>}
                    />
                    <IconButton color='inherit'>
                        <EditIcon fontSize='large' />
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(e, channel.id)} color='inherit'>
                        <DeleteIcon fontSize='large' />
                    </IconButton>
                    <IconButton color='inherit'>
                        <ExpandMoreIcon fontSize='large' />
                    </IconButton>
                    <IconButton color='inherit' onClick={() => { history.push(`/channel/${channel.id}`); }}>
                        <ForwardIcon fontSize='large' />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default ChannelList;
