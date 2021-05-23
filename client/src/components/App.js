import React, { useEffect } from 'react';

import ChannelApi from '../api/ChannelApi';

const App = () => {
    useEffect(async () => {
        const channels = await ChannelApi.getChannelsByUser(3);
        console.log('channels: ', channels);
    });

    return (
        <div>
            <h1>Welcome to YouTube Mashup!</h1>
        </div>
    );
}

export default App;
