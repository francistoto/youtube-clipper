import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import VideocamIcon from '@material-ui/icons/Videocam';

import AuthContext from '../contexts/auth';

import ChannelAPI from '../api/ChannelAPI';

const Home = () => {
    const [channels, setChannels] = useState([]);
    const [isLoadingChannels, setIsLoadingChannels] = React.useState(true);

    const { authenticated, user: currentUser } = useContext(AuthContext);

    const history = useHistory();

    useEffect(async () => {
        if (isLoadingChannels && authenticated && currentUser.id) {
            const userChannels = await ChannelAPI.getChannelsByUser(currentUser.id);
            
            setChannels(userChannels);
            setIsLoadingChannels(false);
        }
    }, [authenticated, isLoadingChannels, currentUser]);

    const renderChannelList = () => {
        if (channels && channels.length > 0) {
            return channels.map((channel, index) => {
                const { id, name, videos } = channel;
                return (
                    <ListItem 
                        key={`${name}`}
                        style={{ 
                            cursor: 'pointer',
                            border: '1px solid white',
                            borderRadius: '5px',
                            backgroundColor: 'gray'
                        }}
                        onClick={() => { history.push(`/channel/${id}`) }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <VideocamIcon fontSize='large' />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant='h4'>Name: {name}</Typography>} />
                    </ListItem>
                );
            });
        }

        return <Typography variant='h2'>No Channels Found!</Typography>;
    }

    return (
        <div>
            <Container>
                <List>
                    {renderChannelList()}
                </List>
            </Container>
        </div>
    );
};

export default Home;
