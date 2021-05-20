import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import App from './components/App';
import UsersPage from './components/UsersPage';

ReactDOM.render((
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
  ),
  document.getElementById('app')
);
