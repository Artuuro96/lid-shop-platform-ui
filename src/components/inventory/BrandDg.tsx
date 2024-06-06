import {SetStateAction, Fragment, Dispatch} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, TextField } from '@mui/material';

export default function BrandDg({
  openDg,
  setOpenDg,
  brand,
}: {
  openDg: boolean,
  setOpenDg: Dispatch<SetStateAction<boolean>>,
  brand?: string
}) {
  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDg}
        onClose={() => setOpenDg(true)}
      >
        <DialogTitle>Nueva Marca</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} marginTop={1}>
            <Grid item xs={6}>
              <TextField label="Nombre de Marca" value={brand || ''} fullWidth/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Siglas" fullWidth/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción" fullWidth/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDg(false)} color="error">Cerrar</Button>
          <Button onClick={() => {}} color="success">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}