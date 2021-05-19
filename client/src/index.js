import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { Router, Route, Link} from 'react-router';
import UsersPage from './components/UsersPage';
ReactDOM.render((
  <Router>
    <Route path='/users/:userid' component={UsersPage}>
    </Route>
    <Route path='*' component={App}>
    </Route>
  </Router>
  ),
  document.getElementById('app')
);
