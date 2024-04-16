import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AccountPopover from './AccountPopover';
import MenuIcon from '@mui/icons-material/Menu';

const NAV_WIDTH = 249;

const HEADER_MOBILE = 40;

const HEADER_DESKTOP = 60

const StyledRoot = styled(AppBar)(({ theme }) => ({
  //...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* <Searchbar /> */}
      
        <Typography variant='h5' color={'black'}>
          Title
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
