import React, { useState, useEffect } from 'react';
import { Alert, Box, Grid, Paper, Typography } from '@mui/material';

import FiberNewIcon from '@mui/icons-material/FiberNew';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BugReportIcon from '@mui/icons-material/BugReport';
import GavelIcon from '@mui/icons-material/Gavel';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

import { Online } from './Online';

import { ResponsiveSquare } from '../../components/layout/ResponsiveSquare';
import { ServerId } from '../../utils/servers-list';

type StatsProps = {
  serverId: ServerId;
};

type StatsCardProps = {
  icon: JSX.Element;
  value: number;
  title: string;
};

const StatsCard = ({ icon, value, title }: StatsCardProps) => {
  return (
    <Grid item md={3}>
      <Paper elevation={4} sx={{ borderRadius: '.3rem' }}>
        <ResponsiveSquare>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              p: 4,
            }}>
            <Typography
              variant="body1"
              color="primary"
              sx={{
                fontSize: '3rem',
              }}>
              {icon}
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '3rem',
                fontWeight: 700,
              }}>
              {value}
            </Typography>
            <Typography variant="h5" component="h5" sx={{ fontWeight: 100 }}>
              {title}
            </Typography>
          </Box>
        </ResponsiveSquare>
      </Paper>
    </Grid>
  );
};

const Stats = ({ serverId }: StatsProps) => {
  return (
    <>
      <Online currentOnline={{ players: 7, slots: 64 }}></Online>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <StatsCard
          icon={<FiberNewIcon fontSize="inherit" />}
          value={553}
          title="Newbies"
        />
        <StatsCard
          icon={<VpnKeyIcon fontSize="inherit" />}
          value={1928}
          title="Logins"
        />
        <StatsCard
          icon={<GavelIcon fontSize="inherit" />}
          value={75}
          title="Bans"
        />
        <StatsCard
          icon={<BugReportIcon fontSize="inherit" />}
          value={736}
          title="Errors"
        />
        <StatsCard
          icon={<AlternateEmailIcon fontSize="inherit" />}
          value={239}
          title="Mentions"
        />
        <StatsCard
          icon={<HolidayVillageIcon fontSize="inherit" />}
          value={99}
          title="Regions"
        />
        <StatsCard
          icon={<QuestionAnswerIcon fontSize="inherit" />}
          value={11847}
          title="Messages"
        />
        <StatsCard
          icon={<FormatColorFillIcon fontSize="inherit" />}
          value={673}
          title="Lava Buckets"
        />
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
        }}>
        <Alert severity="warning">
          Last update: {new Date().toLocaleString()}
        </Alert>
      </Box>
    </>
  );
};

export { Stats };
