import { Box } from '@mui/material';
import React from 'react';

import { Terminal } from './Terminal';
import { ServerId } from '../../utils/servers-list';

type RconProps = {
  serverId: ServerId;
};

const Rcon = ({ serverId }: RconProps) => {
  return <Box>Rcon</Box>;
};

export { Rcon };
