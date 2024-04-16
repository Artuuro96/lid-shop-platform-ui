import PropTypes from 'prop-types';
import { Box, ButtonBase, Typography } from '@mui/material';

export interface SideNavProps {
  active: boolean;
  icon: JSX.Element; 
  title: string;
  disabled: boolean;
  path: string;
}

export const SideNavItem = (sideNavProps: SideNavProps) => {
  const { active = false, disabled, icon, title } = sideNavProps;

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
      >
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              color: 'white',
              ...(active && {
              })
            }}
          >
            {icon}
          </Box>
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          <Typography>
            {title} 
          </Typography>
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
