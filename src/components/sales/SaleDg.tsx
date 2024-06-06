import { Dispatch, Fragment, ReactElement, Ref, SetStateAction, forwardRef } from 'react';
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
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { StatusEnum } from '../../enum/status.enum';
import { Article } from '../../interfaces/article.interface';
import LidButton from '../common/LidButton';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(
  itemCode: string,
  item: string,
  ticketPrice: number,
  tax: number,
  brand: string,
  parcel: number,
  otherCosts: number,
  lidShopPrice: number,
  profit: number,
  status: StatusEnum
): Article {
  return {
    itemCode,
    item,
    ticketPrice,
    tax,
    brand,
    parcel,
    otherCosts,
    lidShopPrice,
    profit,
    status,
  };
}

const rows = [
  createData('A202413', 'GUESS MOCHILA VERDE', 305, 3.7, 'GUESS', 67, 21.29, 1650, 729, StatusEnum.AVAILABLE),
  createData('A202414', 'STEVE NEGRA GRANDE CADENA', 452, 25.0, 'STEVE MADDEN', 51, 21.29, 1300, 450, StatusEnum.AVAILABLE),
  createData('A202415', 'MK MOCHILA', 262, 16.0, 'GUESS', 24, 21.29, 2100, 210, StatusEnum.AVAILABLE),
  createData('A202416', 'MK CAFÉ', 159, 6.0, 'GUESS', 24, 21.29, 2200, 400, StatusEnum.AVAILABLE),
  createData('A202417', 'STEVE BLANCA', 356, 16.0, 'GUESS', 49, 21.29, 7690, 800, StatusEnum.AVAILABLE),
  createData('A202418', 'STEVE AZUL CIELO', 408, 3.2, 'GUESS', 87, 21.29, 5320, 100, StatusEnum.AVAILABLE),
  createData('A202419', 'BOLSA BLANCA COACH', 237, 9.0, 'COACH', 37, 21.29, 5403, 320, StatusEnum.AVAILABLE),
  createData('A202420', 'MUÑEQUERA COACH BEIGE', 375, 0.0, 'GUESS', 94, 21.29, 3980, 801, StatusEnum.AVAILABLE),
  createData('A202421', 'KP CARTERA NEGRA', 518, 26.0, 'KIPLING', 65, 21.29, 361, 540, StatusEnum.AVAILABLE),
  createData('A202422', 'LOCIÓN LOVE SPELL CASHMERE', 392, 0.2, 'LOVE', 98, 21.29, 985, 1100, StatusEnum.AVAILABLE),
  createData('A202423', 'CREMA LOVE SPELL', 318, 0, 'GUESS', 81, 21.29, 3500, 980, StatusEnum.AVAILABLE),
  createData('A202424', 'LOCIÓN LOVE SPELL', 360, 19.0, 'GUESS', 9, 21.29, 1300, 430, StatusEnum.AVAILABLE),
  createData('A202425', 'LOCIÓN LOVE SPELL', 437, 18.0, 'GUESS', 63, 21.29, 2480, 1750, StatusEnum.AVAILABLE),
]

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

  const handleClose = () => {
    setOpenDg(false);
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={openDg}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
              onClick={handleClose}
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
                      />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    </Paper>
                  </Grid>
                  <Grid item xs={4} />
                  <Grid item xs={2} container justifyContent="flex-end">
                    <LidButton varianttype='primary'>
                      Siguiente
                    </LidButton>
                  </Grid>
                </Grid>
               
                <Grid container spacing={4} paddingTop={3}>
                  {rows.map((row, i) => (
                    <Grid item xs={4} key={row.itemCode + i}>
                      <Card sx={{
                        border: `2px solid black`,
                        boxShadow: `6px 6px 0px black`,
                      }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="150"
                            image={i%2 === 0 && i%4 === 0 ? "/public/cartera.jpg" : i%2 === 0 ? "/public/chamarra.jpg" : "/public/bolsa.jpg"}
                            alt="green iguana"
                            sx={{ objectFit: 'contain',  backgroundColor: 'white' }}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              {row.itemCode}
                            </Typography>
                            <Typography variant="body2" >
                              {row.item}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button 
                            size="small" 
                            color="secondary" 
                            variant="contained"
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
                    {rows.slice(0,5).map((row, i) => (
                      <Card 
                        key={'card-list' + i + row.itemCode}
                        sx={{border: (theme) => `1px solid ${theme.palette.secondary.main}`, m: 1}
                      }>
                      <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon color='error'/>
                        </IconButton>
                      }>
                        <ListItemAvatar>
                          <Avatar
                            src={i % 2 === 0 && i % 4 === 0 ? "/public/cartera.jpg" : i % 2 === 0 ? "/public/chamarra.jpg" : "/public/bolsa.jpg"}
                            sx={{ objectFit: 'contain' }} />
                        </ListItemAvatar>
                        <ListItemText primary={row.item} secondary={'$' + row.lidShopPrice} />
                      </ListItem>
                      </Card>
                    ))}
                  </List>
                <Typography variant="h5" fontWeight="bold" component="div" align="right">
                  Total: $7680.00
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </Fragment>
  );
}
