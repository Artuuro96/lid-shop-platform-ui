import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StyledNavItem = styled((props: any) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.active': {
    color: 'red',
    bgcolor: 'red',
    fontWeight: 'fontWeightBold',
  },
});
