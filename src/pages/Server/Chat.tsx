import { Box } from '@mui/material';
import React from 'react';

import { Terminal } from './Terminal';
import { ServerId } from '../../utils/servers-list';

type ChatProps = {
  serverId: ServerId;
};

const Chat = ({ serverId }: ChatProps) => {
  return <Box>Chat</Box>;
};

export { Chat };
