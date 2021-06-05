import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AuthContext from '../contexts/auth';

const MENU_OPTIONS = [
    { key: 'profile', text: 'Profile', link: '/profile' },
    { key: 'logout', text: 'Log Out', link: '/logout' }
];

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        const { key, link } = MENU_OPTIONS[index];
    
        setAnchorEl(null);
        history.push(link)
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton color='inherit' onClick={handleClick}><AccountCircleIcon /></IconButton>
            <Menu
                elevation={0}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
            {
                MENU_OPTIONS.map((option, index) => (
                    <MenuItem
                        key={option.key}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option.text}
                    </MenuItem>

                ))
            }

            </Menu>
        </div>
    );
};

export default UserMenu;
