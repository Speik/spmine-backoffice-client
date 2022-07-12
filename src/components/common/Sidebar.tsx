import React from 'react';
import { Link } from 'react-router-dom';

import {
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  ListSubheader,
  Typography,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowRight from '@mui/icons-material/ArrowRight';
import StorageIcon from '@mui/icons-material/Storage';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import GroupIcon from '@mui/icons-material/Group';

import { AppRoutes } from '../../utils/routes';
import packageJson from '../../../package.json';

type SidebarProps = { sidebarWidth: number };

const Sidebar = ({ sidebarWidth }: SidebarProps) => {
  return (
    <Drawer
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
        },
      }}
      variant="permanent"
      anchor="left">
      <Toolbar>
        <Typography variant="body1" color="text.secondary">
          v{packageJson.version}
        </Typography>
      </Toolbar>
      <Divider />
      <List
        subheader={
          <ListSubheader
            component="div"
            id="minecraft-pages-subheader"
            sx={{ bgcolor: 'background.default' }}>
            Minecraft
          </ListSubheader>
        }>
        <ListItem disablePadding>
          <Tooltip title="Choose server to interact" placement="right">
            <ListItemButton component={Link} to={AppRoutes.Servers}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Servers" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding>
          <Tooltip title="List of patchnotes" placement="right">
            <ListItemButton component={Link} to={AppRoutes.Patchnotes}>
              <ListItemIcon>
                <FormatColorTextIcon />
              </ListItemIcon>
              <ListItemText primary="Patchnotes" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding>
          <Tooltip title="Purchases at online shop" placement="right">
            <ListItemButton component={Link} to={AppRoutes.Donates}>
              <ListItemIcon>
                <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary="Donate" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader
            component="div"
            id="backoffice-pages-subheader"
            sx={{ bgcolor: 'background.default' }}>
            Backoffice
          </ListSubheader>
        }>
        <ListItem disablePadding>
          <Tooltip title="Backoffice users management" placement="right">
            <ListItemButton component={Link} to={AppRoutes.Users}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        <ListItem component="div" disablePadding>
          <ListItemButton
            sx={{ height: 56 }}
            component={Link}
            to={AppRoutes.Profile}>
            <ListItemIcon>
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="USER_NAME"
              primaryTypographyProps={{
                color: 'primary',
                fontWeight: 'medium',
                variant: 'body2',
              }}
            />
          </ListItemButton>
          <Tooltip title="Logout">
            <IconButton
              component={Link}
              to={AppRoutes.Logout}
              size="large"
              sx={{
                '& svg': {
                  color: 'rgba(255,255,255,0.8)',
                  transition: '0.2s',
                  transform: 'translateX(0) rotate(0)',
                },
                '&:hover, &:focus': {
                  bgcolor: 'unset',
                  '& svg:first-of-type': {
                    transform: 'translateX(-4px) rotate(-20deg)',
                  },
                  '& svg:last-of-type': {
                    right: 0,
                    opacity: 1,
                  },
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  height: '80%',
                  display: 'block',
                  left: 0,
                  width: '1px',
                  bgcolor: 'divider',
                },
              }}>
              <LogoutIcon />
              <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
  );
};

export { Sidebar };
