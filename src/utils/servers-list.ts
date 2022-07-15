import { AppRoutes } from './routes';
import { replaceRouteParams } from './helpers';

enum ServerId {
  Auth = 'auth',
  Lobby = 'lobby',
  Classic = 'classic',
}

const SERVERS_LIST = [
  {
    id: ServerId.Auth,
    route: replaceRouteParams(AppRoutes.Server, { id: ServerId.Auth }),
    name: 'Auth Server',
    banner: 'auth-server.jpg',
    description: `
      Authentication server. It's entrypoint of ${process.env.REACT_APP_NAME}.
      Used by players to register and logging in.
    `,
  },
  {
    id: ServerId.Lobby,
    route: replaceRouteParams(AppRoutes.Server, { id: ServerId.Lobby }),
    name: 'Lobby Server',
    banner: 'lobby-server.jpg',
    description: `
      Just hub server. In order of multiserver ${process.env.REACT_APP_NAME}
      architecture, lobby is used to navigate by servers from single place.
    `,
  },
  {
    id: ServerId.Classic,
    route: replaceRouteParams(AppRoutes.Server, { id: ServerId.Classic }),
    name: 'Classic Server',
    banner: 'classic-server.jpg',
    description: `
      Server with classic (not vanilla) gameplay. It was first server
      developed as part of ${process.env.REACT_APP_NAME} brand. Includes
      survival and creative worlds.
    `,
  },
];

export { ServerId, SERVERS_LIST };
