/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';
import { Box, SxProps } from '@mui/system';
import { StyledRootScrollbar, StyledScrollbar } from './styles';

interface ScrollbarProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

function Scrollbar({ children, sx }: ScrollbarProps): JSX.Element {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
