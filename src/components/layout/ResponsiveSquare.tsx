import React from 'react';
import { Box } from '@mui/material';

type ResponsiveSquareProps = {
  children: JSX.Element;
};

const ResponsiveSquare = ({ children }: ResponsiveSquareProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          float: 'left',
          paddingTop: '100%',
        },
      }}>
      {children}
    </Box>
  );
};

export { ResponsiveSquare };
