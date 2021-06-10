import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReactNotification from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import './css/style.css';
import defaultTheme from './theme';

import App from './components/App';

import UserAPI from './api/UserAPI';

import AuthContext from './contexts/AuthContext';

const Index = () => {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    if (!authenticated) {
      try {
        const { authenticated } = await UserAPI.getCurrentUser();
  
        setAuthenticated(authenticated);
      } catch(error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(async () => {
    if (authenticated) {
      const { user } = await UserAPI.getCurrentUser();

      setUser(user);
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user }}>
      <ReactNotification />
      <MuiThemeProvider theme={defaultTheme}>
        <App setAuthenticated={setAuthenticated} />
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
};

render(<Index />, document.getElementById('app'));
