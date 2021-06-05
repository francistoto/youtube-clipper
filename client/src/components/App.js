import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ChannelAPI from '../api/ChannelAPI';
import AuthContext from '../contexts/auth';

import Channel from './Channel';
import Header from './Header';
import Profile from './Profile';
import Home from './Home';

const App = () => {
    // const [channels, setChannels] = React.useState();
    // const [isLoadingChannels, setIsLoadingChannels] = React.useState(true);

    // const { authenticated, user: currentUser } = useContext(AuthContext);

    // useEffect(async () => {
    //     if (isLoadingChannels && authenticated && currentUser.id) {
    //         const userChannels = await ChannelAPI.getChannelsByUser(currentUser.id);
    //         console.log('userChannels: ', userChannels);
            
    //         setChannels(userChannels);
    //         setIsLoadingChannels(false);
    //     }
    // }, [authenticated, isLoadingChannels, currentUser]);
    
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
