import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AuthContext from '../contexts/AuthContext';
import axios from 'axios';

const MENU_OPTIONS = [
    { key: 'profile', text: 'Profile', link: '/profile' },
    { key: 'logout', text: 'Log Out', link: '/api/auth/logout' }
];

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    const { setAuthenticated, user } = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuItemClick = async (event, index) => {
        const { key, link } = MENU_OPTIONS[index];
    
        setAnchorEl(null);

        if(key !== 'logout') {
            history.push(link)
        } else {
            const response = await axios.get(link);

            console.log('response: ', response);

            if (location.pathname !== '/') {
                history.push('/');
            }

            setAuthenticated(false);
        }
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
