import React from 'react';
import { Box } from '@mui/material';

type OverlappingBoxProps = { children: JSX.Element };

const OverlappingBox = ({ children }: OverlappingBoxProps) => {
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
      {children}
    </Box>
  );
};

export { OverlappingBox };
