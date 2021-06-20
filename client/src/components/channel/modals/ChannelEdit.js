import React, { useContext, useState } from 'react';
import { store } from 'react-notifications-component';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthContext from '../../../contexts/AuthContext';

import ChannelAPI from '../../../api/ChannelAPI';

import { BASE_NOTIFICATION_OPTIONS } from '../../../config/constants';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    }
}));

const ChannelEdit = ({ component, componentProps}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(componentProps.channel.name);
    const [error, setError] = useState({ status: false, message: '' });

    const { user: { id: userId } } = useContext(AuthContext);
    
    const classes = useStyles();
    
    const { setIsLoadingChannels, channel, channelNames, handleDropdownClose } = componentProps;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (e) => {
        setName('');
        setOpen(false);
        handleDropdownClose();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const validateChannelName = (name) => {
        if (channelNames.includes(name)) {
            setError({
                status: true,
                message: 'Channel name already used. Pick another name.'
            });

            return false;
        }
        
        if (name.length === 0) {
            setError({
                status: true,
                message: 'Channel name cannot be empty'
            });

            return false;
        }

        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id } = channel;

        if (validateChannelName(name)) {
            setError({
                status: false,
                message: ''
            });

            const newChannel = {
                id,
                name,
                backgroundURL: null,
                userId
            };

            await ChannelAPI.updateChannel(newChannel);
            
            store.addNotification({
                title: 'Success!',
                message: `Channel "${channel.name}" updated to "${name}."`,
                type: 'success',
                ...BASE_NOTIFICATION_OPTIONS
            });

            setOpen(false);
            setIsLoadingChannels(true);

        }
    };

    const renderActivatorComponent = () => {
        if (component) {
            const Component = component;

            return (
                <Component onClick={handleOpen} {...componentProps} />
            );
        }

        return (
            <Button
                onClick={handleOpen}
                color='primary'
                variant='contained'
            >
                Create Channel
            </Button>
        );
    };
    
    return (
        <div>
            {renderActivatorComponent()}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                PaperProps={{
                    classes: {
                        root: classes.paper
                    }
                }}
            >
                <DialogTitle>Create a Channel</DialogTitle>
                <DialogContent>
                    <TextField
                        label={'Channel Name'}
                        name='channelName'
                        value={name}
                        error={error.status}
                        helperText={error.status ? error.message : 'Enter the name of your new channel'}
                        onChange={handleNameChange}
                        fullWidth
                        inputProps={{
                            maxLength: 32
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        color='primary'
                        variant='contained'
                    >Submit</Button>
                    <Button
                        onClick={handleClose}
                        color='secondary'
                        variant='contained'
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChannelEdit;
