import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Avatar from '@mui/material/Avatar';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTitleContext } from '../context/TitleContext';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { logoutUser } from '../store/auth.slice';
import { useDispatch } from 'react-redux';
import { redirectTo } from '../store/ui.slice';
import { getUrlPath } from '../utils/get-url-path';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    '& .MuiPaper-root': {
      backgroundColor: '#000', // Fondo negro del Drawer
    },
  }),
);

const menuItems = [
  { text: 'Panel General', icon: (<DashboardIcon />), path: '/panel', }, 
  { text: 'Ventas', icon: (<LoyaltyIcon />), path: '/ventas', }, 
  { text: 'Inventario', icon: (<WarehouseIcon />), path: '/inventario', }, 
  { text: 'Clientes', icon: (<SwitchAccountIcon />), path: '/clientes', }
];

export default function MiniDrawer() {
  const theme = useTheme();
  const { title } = useTitleContext();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(redirectTo(getUrlPath('login')))
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor: "white"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: 'black',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>Configuración</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }} >Cerrar Sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Avatar sx={{ bgcolor: 'primary.main' }}>DM</Avatar> 
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{position: 'absolute', zIndex: 100}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ bgcolor: 'background.default'}}/> : <ChevronLeftIcon sx={{ color: 'background.default'}} />}
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: 1 }}>
            { open && <Avatar 
              src="/src/assets/logo.jpg"
              sx={{ bgcolor: 'primary.main', margin: 'auto', width: 100, height: 100 }}
            />}
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          { !open && <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: 'white', // Texto blanco
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'white', // Iconos blancos
                }}
              >
                <Avatar 
                  src="/src/assets/logo.jpg"
                  sx={{ bgcolor: 'primary.main', margin: 'auto' }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>}
          {menuItems.map((menuItem, index) => {
            const pathWithoutSlash = menuItem.path.replace('/', '');
            return (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: 'white', // Texto blanco
                  }}
                  onClick={() => dispatch(redirectTo(pathWithoutSlash))}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'white', // Iconos blancos
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuItem.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
