import { Box } from '@mui/material';
import React from 'react';

import { Terminal } from './Terminal';
import { ServerId } from '../../utils/servers-list';

type LogsProps = {
  serverId: ServerId;
};

const Logs = ({ serverId }: LogsProps) => {
  return <Box>Logs</Box>;
};

export { Logs };
