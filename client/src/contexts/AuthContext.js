import { createContext } from 'react';

const auth = {
    authenticated: false,
    setAuthenticated: () => {},
    user: {
        id: 0,
        name: 'Guest User',
        firstName: 'Guest',
        lastName: 'User',
    }
};

const AuthContext = createContext(auth);

export default AuthContext;
