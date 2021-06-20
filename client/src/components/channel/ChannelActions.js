import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import AddVideo from '../videos/modals/AddVideo';
import ChannelEdit from './modals/ChannelEdit';
import DropdownMenu from '../common/DropdownMenu';

import ChannelAPI from '../../api/ChannelAPI';

const ChannelActions = ({ channel, channelNames, setIsLoadingChannels }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const history = useHistory();
    
    const handleDelete = async (e) => {
        e.preventDefault();
        
        await ChannelAPI.deleteChannel(channel.id);
        
        setIsLoadingChannels(true);
    };

    const handleForward = () => {
        history.push(`/channel/${channel.id}`);
    };
    
    const handleSelect = (event, value) => {
        event.preventDefault();

        setSelectedOption(value);
        console.log('selectedOption: ', selectedOption);
    };
    
    const CHANNEL_ACTION_OPTIONS = [
        {
            label: 'Go To Channel',
            value: 'forward',
            action: handleForward
        },
        {
            label: 'Edit Channel',
            value: 'edit',
            action: handleSelect,
            component: ChannelEdit,
            componentProps: {
                channel,
                setIsLoadingChannels,
                channelNames
            }
        },
        {
            label: 'Add Video',
            value: 'addVideo',
            action: handleSelect,
            component: AddVideo
        },
        {
            label: 'Delete Channel',
            value: 'delete',
            action: handleDelete
        }
    ];

    return (
        <div>
            <DropdownMenu
                options={CHANNEL_ACTION_OPTIONS}
                ButtonComponent={IconButton}
                ButtonComponentProps={{
                    color: 'inherit',
                    variant: 'contained'
                }}
                buttonText={<MoreVertIcon />}
            />
        </div>
    );
};

export default ChannelActions;
