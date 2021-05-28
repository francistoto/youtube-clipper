import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import App from './components/App';
import UsersPage from './components/UsersPage';
import UserAPI from './api/UserAPI';
import AuthContext from './contexts/auth';

const Index = () => {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    if (!authenticated) {
      const { authenticated, user } = await UserAPI.getCurrentUser();

      setAuthenticated(authenticated);
      setUser(user);
    }
  });

  return (
    <AuthContext.Provider value={{ authenticated, user }}>
      <Router>
        <ul>
          <li><Link to={'/users/1'}>Users Page</Link></li>
          <li><Link to={'/'}>Home</Link></li>
        </ul>
        <Switch>
          <Route exact path='/users/:userid' component={UsersPage} />
          <Route path='*' component={App} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

render(<Index />, document.getElementById('app'));
