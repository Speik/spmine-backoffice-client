import React from 'react';

import { Box, LinearProgress, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { IServerOnline } from '../../interfaces/entities/server-online';

type OnlineProps = {
  currentOnline: IServerOnline;
};

const Online = ({ currentOnline }: OnlineProps) => {
  const { players, slots } = currentOnline;

  const MIN_ONLINE = 0;
  const MAX_ONLINE = slots;

  const normalise = (value: number) =>
    ((value - MIN_ONLINE) * 100) / (MAX_ONLINE - MIN_ONLINE);

  return (
    <Box>
      <Box sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          component="span"
          color="grey.400"
          sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pt: '.35rem', pr: '.4rem' }}>
            <PublicIcon />
          </Box>
          <Box>
            Online {players} of {slots}
          </Box>
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={normalise(players)} />
    </Box>
  );
};

export { Online };
