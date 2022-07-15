import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { SERVERS_LIST } from '../utils/servers-list';

const Servers = () => {
  const serversCards = [];

  for (const server of SERVERS_LIST) {
    const serverBannerPath = '/static/images/' + server.banner;

    serversCards.push(
      <Grid key={server.id} item lg={6} xs={12}>
        <Card>
          <CardActionArea component={Link} to={server.route}>
            <CardMedia
              component="img"
              height="140"
              image={serverBannerPath}
              alt={server.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {server.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {server.description.trim()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>,
    );
  }

  return (
    <Box sx={{ p: 6 }}>
      <Grid container spacing={2}>
        {serversCards}
      </Grid>
    </Box>
  );
};

export { Servers };
