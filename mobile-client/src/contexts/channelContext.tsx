import React from 'react';
import { Channel } from '../utils/types';

export const ChannelContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

interface Props {
  children: React.ReactNode;
}

interface ContextProps {
  followedChannels: Channel[];
  setFollowedChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  recommendedChannels: Channel[];
  setRecommendedChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
}

export const ChannelProvider = ({ children }: Props): JSX.Element => {
  const [followedChannels, setFollowedChannels] = React.useState<Channel[]>([]);
  const [recommendedChannels, setRecommendedChannels] = React.useState<
    Channel[]
  >([]);
  const value = React.useMemo(
    () => ({
      followedChannels,
      setFollowedChannels,
      recommendedChannels,
      setRecommendedChannels,
    }),
    [followedChannels, recommendedChannels],
  );
  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  );
};
