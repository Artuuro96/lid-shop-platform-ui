import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDialogAlertContext } from '../../context/DialogAlertContext';
import { Grid } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const { dgAlert, setDgAlert } = useDialogAlertContext()

  const handleClickOpen = () => {
    setDgAlert({...dgAlert, open: true })
  };

  const handleClose = () => {
    setDgAlert({...dgAlert, open: false })
  };

  return (
    <Grid container marginTop={-5}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={dgAlert.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dgAlert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dgAlert.textContent}
          </DialogContentText>
          {dgAlert.html && (
            <div dangerouslySetInnerHTML={{ __html: dgAlert.html }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancelar</Button>
          <Button onClick={handleClose} color='info'>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Grid >
  );
}