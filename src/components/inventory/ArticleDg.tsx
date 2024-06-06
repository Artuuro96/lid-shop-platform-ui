import { SetStateAction, Fragment, Dispatch, useState, useEffect, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material';
import { Article, Data } from '../../interfaces/article.interface';

export default function ArticleDg({
  openArticleDg,
  setOpenArticleDg,
  isEditAction,
  article
}: {
  openArticleDg: boolean,
  setOpenArticleDg: Dispatch<SetStateAction<boolean>>,
  isEditAction: boolean,
  article: Data,
}) {
  const [newArticle, setNewArticle] = useState<Article>(article);

  useEffect(() => {
    setNewArticle(article);
  }, [article]);

  const onSaveNewArticle = (): void => {
    setOpenArticleDg(false);
  }

  const onEditNewArticle = (): void => {
    setOpenArticleDg(false);
  }

  const handleInputChange = (key: keyof Article, value: string | number) => {
    setNewArticle((prevArticle) => ({
      ...prevArticle,
      [key]: value
    }));
  }

  const handleNumberInputChange = (key: keyof Article, value: string) => {
    handleInputChange(key, parseFloat(value) || 0);
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth='md'
        open={openArticleDg}
        onClose={() => setOpenArticleDg(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {isEditAction ? 'Editar Articulo' : 'Nuevo Articulo'}
        </DialogTitle>
        <DialogContent>
          <Grid container padding={1} spacing={2}>
            <Grid item xs={3}>
              <TextField 
                id="itemCode" 
                label="Codigo Item" 
                variant="outlined" 
                color="secondary"
                fullWidth
                value={newArticle?.itemCode || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange('itemCode', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                id="item" 
                label="Item" 
                variant="outlined" 
                color="secondary"
                fullWidth
                value={newArticle?.item || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange('item', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                id="brand"
                freeSolo
                color='secondary'
                options={['Tommy Hilfiger', 'Nike', 'Victoria Secret']}
                fullWidth
                renderInput={(params) => <TextField {...params} color="secondary" label="Marca" />}
                value={newArticle?.brand || ''}
                onChange={(_event, value) => handleInputChange('brand', value || '')}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField 
                id="ticketPrice" 
                label="Precio Ticket" 
                variant="outlined" 
                color="secondary"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="start">USD</InputAdornment>,
                }}
                value={newArticle?.ticketPrice || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleNumberInputChange('ticketPrice', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField 
                id="tax" 
                label="Tax" 
                variant="outlined" 
                color="secondary"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="start">USD</InputAdornment>,
                }}
                value={newArticle?.tax || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleNumberInputChange('tax', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField 
                id="parcel" 
                label="Paqueteria" 
                variant="outlined" 
                color="secondary"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="start">USD</InputAdornment>,
                }}
                value={newArticle?.parcel || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleNumberInputChange('parcel', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField 
                id="lidShopPrice" 
                label="Precio Lid Shop" 
                variant="outlined" 
                color="secondary"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="start">MXN</InputAdornment>,
                }}
                value={newArticle?.lidShopPrice || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleNumberInputChange('lidShopPrice', event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArticleDg(false)}>
            Cerrar
          </Button>
          <Button onClick={() => isEditAction ? onEditNewArticle() : onSaveNewArticle()}>
            {isEditAction ? 'Editar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
