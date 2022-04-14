import ChannelClass, { Channel } from '../../models/Channel';

export const getChannel = async (id: string | number): Promise<ChannelClass> => await Channel.query().findById(id);
