import React, { SyntheticEvent, useEffect, useState } from 'react';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
  Zoom,
} from '@mui/material';

import { useParams, Navigate } from 'react-router-dom';
import { TransitionProps } from '@mui/material/transitions';

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChatIcon from '@mui/icons-material/Chat';
import DnsIcon from '@mui/icons-material/Dns';
import TerminalIcon from '@mui/icons-material/Terminal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { Stats } from './Stats';
import { Chat } from './Chat';
import { Logs } from './Logs';
import { Rcon } from './Rcon';

import { ServerId, SERVERS_LIST } from '../../utils/servers-list';
import { delay } from '../../utils/helpers';

type PagesNames = 'stats' | 'chat' | 'logs' | 'rcon';
type ServerProps = { sidebarWidth: number };

const DialogTransition = React.forwardRef(function DialogTransition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

const Server = ({ sidebarWidth }: ServerProps) => {
  const [isRestartConfirmShown, setRestartConfirmShown] = useState(false);
  const [isRestartPending, setRestartPending] = useState(false);
  const handleCloseRestartConfirm = () => setRestartConfirmShown(false);

  const handleServerRestart = async () => {
    setRestartPending(true);

    await delay(1000);

    setRestartPending(false);
    handleCloseRestartConfirm();
  };

  const [currentPage, setCurrentPage] = useState<PagesNames>('stats');
  const handleSwitchPage = (e: SyntheticEvent, newValue: PagesNames) => {
    setCurrentPage(newValue);
  };

  const serverBannerBasePath = '/static/images/';
  const [bannerOffset, setBannerOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setBannerOffset(window.pageYOffset * 0.4);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getServerData = (id: string) => {
    return SERVERS_LIST.find((server) => server.id === id);
  };

  const { id: serverId } = useParams();
  const server = getServerData(serverId as string);
  const serverBannerPath = serverBannerBasePath + server?.banner;

  const isServerExists = SERVERS_LIST.find((server) => {
    return server.id === serverId;
  });

  if (!serverId || !server || !isServerExists) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        height: '100%',
      }}>
      <Box sx={{ position: 'relative', flex: '0 0 auto' }}>
        <Box
          sx={{
            position: 'relative',
            backgroundImage: `url(${serverBannerPath})`,
            backgroundSize: 'cover',
            backgroundPosition: '0 50%',
            backgroundRepeat: 'no-repeat',
            minHeight: '400px',
            height: '60vh',
            top: `${bannerOffset}px`,
          }}></Box>
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            px: 6,
            py: 2,
            background: `linear-gradient(to top,
              rgba(0, 0, 0, .6) 10%,
              transparent 40%
            )`,
          }}>
          <Box>
            <Typography variant="h1" component="h1" sx={{ fontWeight: 700 }}>
              {server.name}
            </Typography>
            <Typography
              variant="body1"
              color="grey.200"
              sx={{ maxWidth: '60%' }}>
              {server.description}
            </Typography>
            <Box sx={{ position: 'relative', pt: 3 }}>
              <Button
                variant="outlined"
                size="large"
                color="info"
                startIcon={<RestartAltIcon />}
                onClick={() => setRestartConfirmShown(true)}
                sx={{
                  borderColor: '#aaa',
                  color: '#aaa',
                  '&:hover': {
                    color: 'error.500',
                    borderColor: 'error.500',
                  },
                }}>
                Restart
              </Button>
              <Dialog
                open={isRestartConfirmShown}
                onClose={handleCloseRestartConfirm}
                TransitionComponent={DialogTransition}>
                <DialogTitle>Restart {server.name}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to restart this server?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseRestartConfirm}>Cancel</Button>
                  <Box
                    sx={{
                      my: 1,
                      position: 'relative',
                      display: 'inline-flex',
                    }}>
                    <Button
                      variant="contained"
                      disabled={isRestartPending}
                      onClick={handleServerRestart}>
                      Proceed
                    </Button>
                    {isRestartPending && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Box>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'background.default',
          zIndex: '1',
          flex: '1 1 100%',
          p: 6,
        }}>
        {currentPage === 'stats' && <Stats serverId={serverId as ServerId} />}
        {currentPage === 'chat' && <Chat serverId={serverId as ServerId} />}
        {currentPage === 'logs' && <Logs serverId={serverId as ServerId} />}
        {currentPage === 'rcon' && <Rcon serverId={serverId as ServerId} />}
        <Toolbar />
        <BottomNavigation
          sx={{
            position: 'fixed',
            right: '0',
            bottom: '0',
            width: `calc(100% - ${sidebarWidth}px)`,
            backgroundColor: 'background.default',
            borderTop: 1,
            borderColor: 'divider',
            backgroundImage: 'none',
            bgcolor: 'rgba(10, 25, 41, 0.6)',
            backdropFilter: 'blur(20px)',
          }}
          value={currentPage}
          onChange={handleSwitchPage}>
          <BottomNavigationAction
            label="Stats"
            value="stats"
            icon={<QueryStatsIcon />}
          />
          <BottomNavigationAction
            label="Chat"
            value="chat"
            icon={<ChatIcon />}
          />
          <BottomNavigationAction
            label="Logs"
            value="logs"
            icon={<DnsIcon />}
          />
          <BottomNavigationAction
            label="Rcon"
            value="rcon"
            icon={<TerminalIcon />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export { Server };
