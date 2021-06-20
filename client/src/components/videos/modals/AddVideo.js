import React, { useState } from 'react';
import {
    AppBar,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
}));

const AddVideo = ({ component, componentProps }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(null);

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

    const handleSubmit = () => {
        console.log('query: ', query);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
            setQuery(null);
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
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddVideo;
