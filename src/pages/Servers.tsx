import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { SERVERS_LIST } from '../utils/servers-list';

const BASE_SERVER_BANNER_PATH = process.env.PUBLIC_URL + '/static/images/';

const Servers = () => {
  const serversCards = [];

  for (const server of SERVERS_LIST) {
    const serverBannerPath = BASE_SERVER_BANNER_PATH + server.banner;

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
    <Grid container spacing={2}>
      {serversCards}
    </Grid>
  );
};

export { Servers };
