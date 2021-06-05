import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReactNotification from 'react-notifications-component'
import axios from 'axios';

import 'react-notifications-component/dist/theme.css'
import './css/style.css';
import defaultTheme from './theme';

import App from './components/App';
import Profile from './components/Profile';

import UserAPI from './api/UserAPI';

import AuthContext from './contexts/auth';
import Header from './components/Header';

const Index = () => {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    if (!authenticated) {
      const { data: { token } } = await axios.get('/api/auth/token');
      if (token) {
        localStorage.setItem('token', token);
        const { authenticated, user } = await UserAPI.getCurrentUser();
  
        setAuthenticated(authenticated);
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
    <AuthContext.Provider value={{ authenticated, user }}>
      <ReactNotification />
      <MuiThemeProvider theme={defaultTheme}>
        <App/>
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
};

render(<Index />, document.getElementById('app'));
