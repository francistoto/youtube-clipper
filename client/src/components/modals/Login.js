import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import googleSignInButtonImage from '../../public/assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';

const Login = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        window.location.replace('/api/auth/login');
    }

    return (
        <div>
            <Button onClick={handleOpen}>Login</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{'Select Login Option'}</DialogTitle>
                <DialogContent>
                    <Button
                        id='google-login-button'
                        onClick={handleLoginClick}
                        startIcon={<img src={googleSignInButtonImage}/>}
                        color='inherit'
                    >
                        Sign in with Google
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Login;
