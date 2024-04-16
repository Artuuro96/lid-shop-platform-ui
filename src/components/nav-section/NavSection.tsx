import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../SvgColor';

const items = [{
  path: '/inventario',
  title: 'Inventario',
  icon: 'inventario',
},{
  path: '/ventas',
  title: 'Ventas',
  icon: 'Ventas',
}, {
  path: '/clientes',
  title: 'Clientes',
  icon: 'clientes',
}];

const fIcon = (name: string) => (
  <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export default function NavSection(): JSX.Element {
  const { pathname } = useLocation();
  return (
    <Box>
      <List disablePadding>
        {items.map((item) => (
          <StyledNavItem
            component={RouterLink}
            to={item.path}
            key='/'
            sx={{
              backgroundColor: 'white',
              '&.active': {
                color: 'white',
                bgcolor: 'white',
                fontWeight: 'fontWeightBold',
                backgroundColor: alpha('#f7fafc', 0.15),
              },
            }}
          >
            <StyledNavItemIcon sx={{
              color: pathname.split('/')[1] === item.path ? 'primary.main' : 'white',
            }}>
              {fIcon(item.icon)} 
            </StyledNavItemIcon>
    
          <ListItemText sx={{ color: 'black' }} disableTypography primary={item.title} />
        </StyledNavItem>
        ))}
      </List>
    </Box>
  );
}
