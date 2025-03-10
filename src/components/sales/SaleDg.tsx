import { ChangeEvent, Dispatch, Fragment, ReactElement, Ref, SetStateAction, forwardRef, useEffect, useState } from 'react';
import {
  Button, 
  Dialog,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography, 
  Slide,
  Grid,
  InputBase,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchArticlesByKeyword } from '../../store/article.slice';
import { useSelector } from 'react-redux';
import { Article } from '../../interfaces/article.interface';
import { addAllItems, addItem, removeItem } from '../../store/cart.slice';
import SaleSummaryDg from './SaleSummary';
import { fetchClients } from '../../store/client.slice';


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaleDg({
  setOpenDg,
  openDg,
}: {
  setOpenDg: Dispatch<SetStateAction<boolean>>
  openDg: boolean
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: articles, loading } = useSelector((state: RootState) => state.article);
  const { shoppingList, availableList, total } = useSelector((state: RootState) => state.cart);
  const [openSaleSummaryDg, setOpenSaleSummaryDg] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const handleClose = () => {
    setOpenDg(false);
  };

  const onSaleContinue = () => {
    dispatch(fetchClients());
    setOpenSaleSummaryDg(true);
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onAddItem = (articleAdded: Article) => {
    dispatch(addItem(articleAdded));
  }

  const onRemoveItem = (articleRemoved: Article) => {
    dispatch(removeItem(articleRemoved));
  }

  useEffect(() => {
    const list = shoppingList.map(articleAvailable => articleAvailable._id);
    const articlesAvailable = articles.filter(article => !list.includes(article._id));
    dispatch(addAllItems(articlesAvailable));
  }, [dispatch, articles, shoppingList])

  useEffect(() => {
    if (keyword.trim() === '') return; // No hacer nada si el keyword está vacío

    const timeoutId = setTimeout(() => {
      dispatch(fetchArticlesByKeyword(keyword));
    }, 750);

    return () => clearTimeout(timeoutId);
  }, [keyword, dispatch]);

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={openDg}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <SaleSummaryDg setOpenSummaryDg={setOpenSaleSummaryDg} openSummaryDg={openSaleSummaryDg}/>
        <AppBar sx={{ position: 'relative', bgcolor: 'black', color: 'white' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Nueva Venta
            </Typography>
            <Button 
              autoFocus 
              onClick={onSaleContinue}
              variant='outlined'
              color='inherit'
              sx={{
                color: (theme) => `${theme.palette.common.white}`,
                border: (theme) => `2px solid ${theme.palette.common.white}`,
                boxShadow: (theme) => `4px 4px 0px ${theme.palette.common.white}`
              }}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 64px)', padding: 2 }}>
          <Grid 
            item xs={8} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              paddingRight: 2,
            }}
          >
            <Card 
              sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 1)'
              }}
            >
              <CardContent 
                sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper
                      component="form"
                      sx={{ 
                        p: '2px 4px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        border: (theme) => `2px solid ${theme.palette.primary.main}`,
                        boxShadow: (theme) => `6px 6px 0px ${theme.palette.primary.main}`,
                        height: 55,
                        flex: '0 0 auto',
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Buscar Articulo"
                        color='primary'
                        inputProps={{ 'aria-label': 'search article' }}
                        value={keyword}
                        onChange={handleSearch}
                      />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    </Paper>
                  </Grid>
                  <Grid item xs={4} />
                </Grid>
                <Grid container spacing={4} paddingTop={3}>
                  {availableList.map((row, i) => (
                    <Grid item xs={4} key={row.code + i}>
                      <Card sx={{
                        border: `2px solid black`,
                        boxShadow: `6px 6px 0px black`,
                      }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="150"
                            image={row.url}
                            alt="green iguana"
                            sx={{ objectFit: 'contain',  backgroundColor: 'white', mt: 2}}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              {row.code}
                            </Typography>
                            <Typography variant="body2" >
                              {row.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button 
                            size="small" 
                            color="secondary" 
                            variant="contained"
                            onClick={() => onAddItem(row)}
                            fullWidth
                          >
                            Añadir
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid 
            item xs={4} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              paddingLeft: 2 
            }}
          >
            <Card 
              sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 1)'
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                  <Typography variant="h6" component="div">
                    Articulos
                  </Typography>
                    {shoppingList.map((row, i) => (
                      <Card 
                        key={'card-list' + i + row.code}
                        sx={{
                          border: (theme) => `2px solid ${theme.palette.primary.main}`,
                          boxShadow: (theme) => `6px 6px 0px ${theme.palette.primary.main}`,
                          marginTop: 2
                        }}>
                        <ListItem secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(row)}>
                            <DeleteIcon color='primary'/>
                          </IconButton>
                        }>
                          <ListItemAvatar>
                            <Avatar
                              src={row.url}
                              sx={{ objectFit: 'contain' }} />
                          </ListItemAvatar>
                          <ListItemText primary={row.name} secondary={'$' + row.lidShopPrice} />
                        </ListItem>
                      </Card>
                    ))}
                  </List>
                
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: 'flex-end', paddingRight: 2 }}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  component="div" 
                >
                  Total: ${total.toFixed(2)}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </Fragment>
  );
}
