import React, { useEffect } from 'react';
import { Box, Container, LinearProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from '../utils/routes';
import { delay } from '../utils/helpers';

type LogoutProps = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Logout = ({ isLoggedIn, setLoggedIn }: LogoutProps) => {
  /**
   * If already logged out - do nothing
   */
  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.Login} />;
  }

  /**
   * Otherweise send request to drop
   * user session
   */
  useEffect(() => {
    /**
     * IMPLEMENT ME
     */
    (async () => {
      await delay(1000);
      setLoggedIn(false);
    })();
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}>
      <Container maxWidth="sm" sx={{ bgcolor: 'background.default' }}>
        <LinearProgress />
      </Container>
    </Box>
  );
};

export { Logout };
