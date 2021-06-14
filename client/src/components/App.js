import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

import Channel from './channel/Channel';
import Header from './Header';
import Profile from './Profile';
import Home from './Home';

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path='/profile' component={Profile} />
                    <Route path='/channel/:channelId' component={Channel} />
                    <Route path='*' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
