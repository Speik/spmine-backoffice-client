import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ROWS_COUNT = 8;

const TableLoadingSkeleton = () => {
  return (
    <Box
      sx={{
        height: 'max-content',
      }}>
      {[...Array(ROWS_COUNT)].map(() => (
        <Skeleton
          key={uuidv4()}
          variant="rectangular"
          animation="wave"
          sx={{ py: 2, my: 1, mx: 1 }}
        />
      ))}
    </Box>
  );
};

export { TableLoadingSkeleton };
