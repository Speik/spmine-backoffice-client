import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { SERVERS_LIST } from '../utils/servers-list';

const Server = () => {
  const { id: serverId } = useParams();
  const isServerExists = SERVERS_LIST.find((server) => {
    return server.id === serverId;
  });

  if (!isServerExists) {
    return <Navigate to="/" />;
  }

  return <div>Hello from &quot;{serverId}&quot; page</div>;
};

export { Server };
