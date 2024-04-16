import { useState, MouseEvent } from 'react';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MenuOption {
  label: string;
  icon: string;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    label: 'Cambiar Rol',
    icon: 'eva:home-fill',
  },
];

export default function AccountPopover(): JSX.Element {
  const [open, setOpen] = useState<null | HTMLElement>(null); // Tipo de estado para el elemento abierto
  const navigate = useNavigate();

  // Manejar la apertura del popover
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  // Manejar el cierre del popover
  const handleClose = () => {
    setOpen(null);
    navigate('/');
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
        }}
      >
        <Avatar>JR</Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Josué Ramírez
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            josuers823@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Cerrar Sesión
        </MenuItem>
      </Popover>
    </>
  );
}
