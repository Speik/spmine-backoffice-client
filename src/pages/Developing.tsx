import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { OverlappingBox } from '../components/layout/OverlappingBox';
import { AppRoutes } from '../utils/routes';

const Developing = () => {
  return (
    <OverlappingBox>
      <Container maxWidth="sm" sx={{ bgcolor: 'background.default' }}>
        <Alert
          severity="warning"
          variant="outlined"
          color="info"
          sx={{ px: '1.5rem', py: '1rem' }}>
          <AlertTitle>Oops!</AlertTitle>
          Can&apos;t open this page because it&apos;s in{' '}
          <strong>developing</strong>
        </Alert>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            mt: '1.5rem',
          }}>
          <Button
            variant="contained"
            component={Link}
            to={AppRoutes.Servers}
            size="large">
            Got it!
          </Button>
          <Box sx={{ width: '100%', textAlign: 'center', mt: '.3rem' }}>
            <Typography variant="caption" color="grey.600">
              Return to servers list
            </Typography>
          </Box>
        </Box>
      </Container>
    </OverlappingBox>
  );
};

export { Developing };
