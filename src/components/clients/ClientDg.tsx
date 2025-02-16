import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { postClient } from '../../store/client.slice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  email: yup.string().email("Ingresa un correo válido").required("El correo es requerido"),
  address: yup.string(),
  cellphone: yup.string().required("El número de teléfono es requerido"),
});

export default function NewClientDg({ setOpenDg, openDg }: { setOpenDg: Dispatch<SetStateAction<boolean>>, openDg: boolean }) {
  const handleClose = () => {
    setOpenDg(false);
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      points: 10,
      age: 0,
      address: "",
      cellphone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(postClient(values));
      handleClose();
    },
  });

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDg}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Nuevo Cliente
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="dense"
            id="lastName"
            name="lastName"
            label="Apellido"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Correo Electrónico"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="dense"
            id="address"
            name="address"
            label="Dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            id="cellphone"
            name="cellphone"
            label="Teléfono"
            value={formik.values.cellphone}
            onChange={formik.handleChange}
            error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
            helperText={formik.touched.cellphone && formik.errors.cellphone}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button onClick={formik.submitForm} color="primary">Guardar</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
