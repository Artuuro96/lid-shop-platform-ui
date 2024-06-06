import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

const LidCustomButton = styled(Button)<{ varianttype: 'primary' | 'secondary' | 'warning' | 'error' | 'info' | 'success' }>(({ theme, varianttype }) => ({
  border: `2px solid ${theme.palette[varianttype].main}`,
  boxShadow: `5px 5px 0px 0px ${theme.palette[varianttype].main}`,
  width: '100%',
}));

interface CustomButtonProps extends ButtonProps {
  varianttype: 'primary' | 'secondary' | 'warning' | 'error' | 'info' | 'success';
}

const LidButton: React.FC<CustomButtonProps> = ({ varianttype, ...props }) => {
  return <LidCustomButton varianttype={varianttype} variant='outlined' color={varianttype} {...props} />;
};

export default LidButton;
