import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ReactNotification from 'react-notifications-component'
import axios from 'axios';

import 'react-notifications-component/dist/theme.css'
import './css/style.css';

import App from './components/App';
import UsersPage from './components/UsersPage';

import UserAPI from './api/UserAPI';

import AuthContext from './contexts/auth';

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
      <Router>
        <Switch>
          <Route exact path='/users/:userid' component={UsersPage} />
          <Route path='*' component={App} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

render(<Index />, document.getElementById('app'));
