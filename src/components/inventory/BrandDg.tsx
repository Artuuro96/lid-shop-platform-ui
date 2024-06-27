import {SetStateAction, Fragment, Dispatch, useState, ChangeEvent} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, TextField } from '@mui/material';
import { Brand } from '../../interfaces/brand.interface';
import { useDispatch } from 'react-redux';
import { postBrand } from '../../store/brand.slice';

export default function BrandDg({
  openDg,
  setOpenDg,
  brandName,
}: {
  openDg: boolean,
  setOpenDg: Dispatch<SetStateAction<boolean>>,
  brandName?: string
}) {
  const dispatch = useDispatch();
  const [newBrand, setNewBrand] = useState<Brand>({
    name: brandName || '',
    acronym: '',
    description: ''
  });

  const onSaveBrand = () => {
    dispatch(postBrand(newBrand));
    setOpenDg(false);
  }

  const handleChangeInput = (key: keyof Brand, value: string) => {
    setNewBrand((prevBrand) => ({
      ...prevBrand,
      [key]: value
    }))
  }

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
              <TextField 
                label="Nombre de Marca" 
                value={newBrand.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeInput('name', event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Siglas" 
                value={newBrand.acronym}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeInput('acronym', event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Descripción" 
                value={newBrand.description}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeInput('description', event.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDg(false)} color="error">Cerrar</Button>
          <Button onClick={onSaveBrand} color="success">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}