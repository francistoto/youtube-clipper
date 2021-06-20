import React, { useState } from 'react';
import {
    AppBar,
    Dialog,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import VideoList from '../VideoList';

import { searchForVideos } from '../../../api/YouTubeAPI';
import VideoAPI from '../../../api/VideoAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        marginBottom: theme.spacing(1),
    },
    appBar: {
        position: 'relative'
    },
    fabRoot: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    fab: {
        margin: theme.spacing(1)
    },
    title: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
}));

const AddVideo = ({ component, componentProps }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedVideoIndices, setSelectedVideoIndices] = useState([]);

    const classes = useStyles();

    const { handleDropdownClose } = componentProps;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleDropdownClose();
    };

    const handleSearchQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async () => {
        const response = await searchForVideos(query);

        setSearchResults(response);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
            setQuery(null);
        }
    };

    const handleSelect = (event, index) => {
        event.preventDefault();
        let newSelectedVideoIndices = Array.from(selectedVideoIndices);

        if (selectedVideoIndices.includes(index)) {
            newSelectedVideoIndices = selectedVideoIndices.filter((selectedVideo) => selectedVideo !== index);
        } else {
            newSelectedVideoIndices.push(index);
        }

        setSelectedVideoIndices(newSelectedVideoIndices);
    }

    const handleClearSelection = (event) => {
        event.preventDefault();

        setSelectedVideoIndices([]);
    };

    const handleAddSelectedVideos = async () => {
        const { channel: { id: channelId }, setIsLoadingChannels } = componentProps;
        
        const newVideos = selectedVideoIndices.map((videoIndex) => ({ channelId, ...searchResults[videoIndex] }));
        
        await VideoAPI.createVideos(newVideos);

        setIsLoadingChannels(true);
    };

    const renderActivatorComponent = () => {
        if (component) {
            const Component = component;

            return (
                <Component onClick={handleOpen} {...componentProps} />
            );
        }

        return (
            <IconButton onClick={handleOpen}>
                <AddIcon fontSize='large' />
            </IconButton>
        );
    };

    return (
        <div>
            {renderActivatorComponent()}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <TextField
                            onChange={handleSearchQueryChange}
                            onKeyDown={handleKeyDown}
                            placeholder='Search YouTube'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Toolbar>
                </AppBar>
                <DialogTitle>
                    <Typography>Search for new videos to add to your channel</Typography>
                </DialogTitle>
                <DialogContent>
                    <VideoList selectable videos={searchResults} selectedVideos={selectedVideoIndices} handleSelect={handleSelect} />
                </DialogContent>
                {selectedVideoIndices.length > 0 &&
                    <div className={classes.fabRoot}>
                        <Fab
                            className={classes.fab}
                            variant='extended'
                            color='primary'
                            onClick={handleClearSelection}
                        >
                            Clear Selection
                        </Fab>
                        <Fab
                            className={classes.fab}
                            variant='extended'
                            color='primary'
                            onClick={handleAddSelectedVideos}
                        >
                            Add Selected Videos
                        </Fab>
                    </div>
                }
            </Dialog>
        </div>
    );
};

export default AddVideo;
