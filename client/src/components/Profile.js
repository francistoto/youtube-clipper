import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import AuthContext from '../contexts/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <Typography variant='h2'>Welcome to your YouTube Mashup profile, User {user.id}!</Typography>
        </div>
    );
};

export default Profile;
