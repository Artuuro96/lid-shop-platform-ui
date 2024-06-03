import { useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";
import { Button, Card, CardContent, Chip, Grid, TextField, Typography, styled } from "@mui/material";

const rows = [{
  item: 'Mochila Tommy Hilfilgher',
  total: 2930.50,
  saleType: 'CONTADO',
  client: 'Arturo Rodríguez',
  vendor: 'Daniela Martínez',
  status: 'Entregada',
}, {
  item: 'Bolsa Coach',
  total: 1500.00,
  saleType: 'CONTADO',
  client: 'Fernando Beltran',
  vendor: 'Lorena Martínez',
  status: 'Apartada',
}];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Sales(): JSX.Element {
  const {setTitle} = useTitleContext();
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    setTitle(getTitle('sales'));
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setTitle]);

  return (
    <div style={{ height: maxHeight, width: '100%' }}>
      <Grid container spacing={1} paddingRight={4} paddingLeft={2}>
      <Grid item xs={4}>
        <TextField 
          id="search-article-input" 
          label="Buscar Articulo(s)" 
          variant="outlined" 
          size="small"
          fullWidth 
          sx={{height: '100%'}}
        />
        </Grid>
        <Grid item xs={4.5}/>
        <Grid item xs={1}>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            color="primary"
            size="large"
            tabIndex={-1}
            fullWidth
          >
            Importar
            <VisuallyHiddenInput type="file" />
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button 
            variant="outlined"
            color="primary" 
            size="large"
            fullWidth
          >
            Exportar
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button 
            variant="contained" 
            fullWidth
            color="primary"
            size="large"
            sx={{
              color: 'white',
            }}
          >
            Nueva Venta
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} padding={3}>
        <Card sx={{
          width: '100%',
          bgcolor: 'black',
          border: `2px solid black`, // Borde negro
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', // Sombra negra
          margin: 1
        }}>
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Item
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Tipo de Venta
                </Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Cliente
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Vendedor
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Estatus
                </Typography>
              </Grid>
              <Grid item xs={1} container justifyContent="flex-end" >
                <Typography fontSize={16} color='white' component="div">
                  Total
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {rows.map(row => (
          <Card sx={{
            width: '100%',
            border: (theme) => `2px solid ${theme.palette.primary.main}`, // Borde negro
            boxShadow: '0 4px 8px rgba(246, 126, 125, 0.6)', // Sombra negra
            margin: 1
          }}>
            <CardContent>
              <Grid container>
                <Grid item xs={3}>
                  <Typography gutterBottom fontSize={16} component="div">
                    {row.item}
                  </Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <Chip label={row.saleType} sx={{borderRadius: 1.6}}/>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography gutterBottom fontSize={16} component="div">
                    {row.client}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography gutterBottom fontSize={16} component="div">
                    {row.vendor}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography gutterBottom fontSize={16} component="div">
                  <Chip label={row.status} sx={{borderRadius: 1.6}} />
                  </Typography>
                </Grid>
                <Grid item xs={1} container justifyContent="flex-end" alignItems="flex-end">
                  <Typography fontSize={20} fontWeight="bold" component="div">
                    $ {row.total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  )
}