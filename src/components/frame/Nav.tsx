import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import Scrollbar from '../scrollbar/Scrollbar';
import NavSection from '../nav-section/NavSection';
//import LogoPng from '../../../public/assets/icons/logo.png';

export interface NavProps { 
  openNav: boolean;
  onCloseNav: () => void;
}

const NAV_WIDTH = 250;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.30),
}));

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [onCloseNav, openNav]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        backgroundColor: 'black'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3}}>
        <img style={{width: '50%'}} alt='Logo'/>
      </Box>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 'fontWeightBold'  }}>
                Arturo 
              </Typography>

              <Typography variant="body2" sx={{ color: 'white' }}>
                Rodriguez
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { 
              width: NAV_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
