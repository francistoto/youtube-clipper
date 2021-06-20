import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChannelListItem from './ChannelListItem';
import ChannelAPI from '../../api/ChannelAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    channelListItem: {
        cursor: 'pointer',
        backgroundColor: 'gray'
    }
}));

const ChannelList = ({ channels, setIsLoadingChannels }) => {
    const classes = useStyles();

    const channelNames = channels.map((channel) => channel.name);

    return (
        <div className={classes.root}>
            {channels.map((channel) => (
                <ChannelListItem
                    key={channel.name}
                    channel={channel}
                    channelNames={channelNames}
                    setIsLoadingChannels={setIsLoadingChannels}
                />
            ))}
        </div>
    );
};

export default ChannelList;
