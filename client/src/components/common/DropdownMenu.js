import React, { useRef, useState } from 'react';
import {
    ClickAwayListener,
    Grow,
    MenuList,
    MenuItem,
    Paper,
    Popper,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    popper: {
        zIndex: 99
    },
    grow: {
        transformOrigin: 'center top'
    }
}));

const MenuItemComponent = ({ onClick, label }) => {
    return (
        <MenuItem onClick={onClick}>
            <Typography>
                {label}
            </Typography>
        </MenuItem>
    );
};

const DropdownMenu = ({ ButtonComponent, ButtonComponentProps, buttonText, options }) => {
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const anchorRef = useRef();

    const optionActions = options.reduce((actions, option) => {
        actions[option.value] = option.action;

        return actions;
    }, {});

    const optionComponents = options.reduce((components, option) => {
        if (option.component) {
            components[option.value] = option.component;
        }

        return components;
    }, {})

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = (event, value) => {
        event.preventDefault();

        setOpen(false);

        if (typeof optionActions[value] === 'function') {
            optionActions[value](event, value);
        } else {
            console.log(`No action to take for option ${value}`);
        }
    };

    const renderMenuListItem = (option) => {
        if (optionComponents[option.value]) {
            const Component = optionComponents[option.value];
            
            return (
                <Component
                    key={option.label}
                    component={MenuItemComponent}
                    componentProps={{
                        label: option.label,
                        handleDropdownClose: handleClose,
                        ...option.componentProps
                    }}
                />
            );
        };

        return (
            <MenuItemComponent
                key={option.label}
                onClick={(event) => handleSelect(event, option.value)}
                label={option.label}
            />
        );
    }

    return (
        <div>
            <ButtonComponent
                onClick={handleOpen}
                ref={anchorRef}
                {...ButtonComponentProps}
            >
                {buttonText}
            </ButtonComponent>
            <Popper
                className={classes.popper}
                open={open}
                anchorEl={anchorRef.current}
                placement='bottom-end'
                transition
                disablePortal
            >{({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} className={classes.grow}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList>
                                {options.map((option) => renderMenuListItem(option))}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    );
};

export default DropdownMenu;
