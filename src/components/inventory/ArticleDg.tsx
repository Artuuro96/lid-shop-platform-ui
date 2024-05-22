import { SetStateAction, Fragment, Dispatch, useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material';
import { Article } from '../../interfaces/article.interface';

export default function ArticleDg({
  openArticleDg,
  setOpenArticleDg,
  isEditAction,
  article
}: {
  openArticleDg: boolean,
  setOpenArticleDg: Dispatch<SetStateAction<boolean>>,
  isEditAction: boolean,
  article: Article,
}) {
  const [newArticle, setNewArticle] = useState<Article>(article);
  const onSaveNewArticle = (): void => {
    console.log("=====>", newArticle);
    setOpenArticleDg(false)
  }

  const onEditNewArticle = (): void => {
    console.log("=====>", newArticle);
    setOpenArticleDg(false)
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewArticle({
                  ...newArticle,
                  itemCode: event.target.value || ''
                })}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewArticle({
                  ...newArticle,
                  item: event.target.value
                })}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                id="brand"
                freeSolo
                color='secondary'
                options={['Tommy Hilfilgher', 'Nike', 'Victoria Secret']}
                fullWidth
                renderInput={(params) => <TextField {...params} color="secondary" label="Marca" />}
                value={newArticle?.brand || ''}
                onChange={(_event, value) => {
                  setNewArticle({
                    ...newArticle,
                    brand: value || ''
                  })
                }}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewArticle({
                  ...newArticle,
                  ticketPrice: parseFloat(event.target.value)
                })}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewArticle({
                  ...newArticle,
                  tax: parseFloat(event.target.value)
                })}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewArticle({
                  ...newArticle,
                  parcel: parseFloat(event.target.value)
                })}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewArticle({
                  ...newArticle,
                  lidShopPrice: parseFloat(event.target.value)
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenArticleDg(false)}>
            Cerrar
          </Button>
          <Button onClick={() => isEditAction ? onEditNewArticle() : onSaveNewArticle()} autoFocus>
            {isEditAction ? 'Editar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}