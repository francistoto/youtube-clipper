import { createContext } from 'react';

const channel = {
    isLoadingChannel: true,
    setIsLoadingChannel: () => {},
    channel: {},
    setChannel: () => {}
};

const ChannelContext = createContext(channel);

export default ChannelContext;
