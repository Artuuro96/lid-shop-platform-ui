import { ChangeEvent, useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";
import { Card, CardContent, Chip, Divider, Grid, IconButton, InputBase, Link, Paper, Typography, styled } from "@mui/material";
import SaleDetailDrawer from "./SaleDetailDrawer";
import { Data } from "../../interfaces/article.interface";
import { formatDate } from "../../utils/date.util";
import { SaleDetail } from "../../interfaces/sale.interface";
import { getChipForSaleStatus } from "../../utils/chip";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaleDg from "./SaleDg";
import LidButton from "../common/LidButton";
import SearchIcon from '@mui/icons-material/Search';

const rows: SaleDetail[] = [{
  saleId: 'V202401',
  total: 2930.50,
  createdAt: new Date(),
  saleType: 'CREDITO',
  client: 'Arturo Rodríguez',
  vendor: 'Daniela Martínez',
  status: 'DELIVERED',
  payments: [
    {
      id: '908901',
      number: 1,
      quantity: 500,
      createdAt: new Date('05/05/2024'),
      receivedBy: 'Lorena Martinez',
      status: 'CONFIRMED'
    },
    {
      id: '908892',
      number: 2,
      quantity: 200,
      createdAt: new Date('06/06/2024'),
      receivedBy: 'Daniela Martínez',
      status: 'PENDING' 
    },
    {
      id: '908892',
      number: 3,
      quantity: 200,
      createdAt: new Date('07/07/2024'),
      receivedBy: 'Daniela Martínez',
      status: 'PENDING'
    },
  ],
  items: [
    {
      itemCode: 'A202401',
      item: 'Mochila Tommy Hilfilgher',
      lidShopPrice: 5800,
    },
    {
      itemCode: 'A202402',
      item: 'Cartera Coach',
      lidShopPrice: 2320,
    }
  ] as Data[]
}, {
  saleId: 'V202402',
  total: 1500.00,
  createdAt: new Date(),
  saleType: 'CONTADO',
  client: 'Fernando Beltran',
  vendor: 'Lorena Martínez',
  status: 'PROCESSED',
  payments: [],
  items: [
    {
      itemCode: 'A202420',
      item: 'Bolsa Guess',
      lidShopPrice: 4500
    },
    {
      itemCode: 'A202421',
      item: 'Cinturon Nike',
      lidShopPrice: 2530
    },
    {
      itemCode: 'A202431',
      item: 'Tennis Tommy Hilfilgher',
      lidShopPrice: 2080
    }
  ] as Data[]
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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SaleDetail>({} as SaleDetail);
  const [filteredSales, setFilteredSales] = useState<SaleDetail[]>(rows);
  const [openSaleDg, setOpenSaleDg] = useState<boolean>(false);

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

  const onSelectSale = (row: SaleDetail) => {
    setOpenDrawer(true); 
    setSelectedSale(row)
  }

  const onSearchSales = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const foundSales = rows.filter(row => row.saleId.includes(event.target.value));
    setFilteredSales(foundSales)
  }

  const onOpenSaleDg = () => {
    setOpenSaleDg(true);
  }

  return (
    <div style={{ height: maxHeight, width: '100%' }}>
      <Grid container spacing={1} paddingRight={4} paddingLeft={2} alignItems="center">
        <Grid item xs={4}>
          <Paper
            component="form"
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center', 
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
              boxShadow: (theme) => `6px 6px 0px ${theme.palette.primary.main}`,
              height: 48,
              flex: '0 0 auto',
            }}
          >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar Venta"
                color='primary'
                onChange={onSearchSales}
                inputProps={{ 'aria-label': 'search article' }}
              />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={4.5}/>
        <Grid item xs={1}>
          <LidButton
            varianttype="primary"
            component="label"
            role={undefined}
            color="primary"
            tabIndex={-1}
            size="large"
            fullWidth
            sx={{
              height: 48
            }}
          >
            Importar
            <VisuallyHiddenInput type="file" />
          </LidButton>
        </Grid>
        <Grid item xs={1}>
         <LidButton
          varianttype="primary"
          size="large"
          sx={{
            height: 48
          }}
         >
          Exportar
         </LidButton>
        </Grid>
        <Grid item xs={1.5}>
          <LidButton 
            varianttype="primary"
            fullWidth
            size="large"
            onClick={onOpenSaleDg}
            sx={{
              height: 48
            }}
          >
            Nueva Venta
          </LidButton>
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
              <Grid item xs={1.2} container justifyContent="center">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  ID venta
                </Typography>
              </Grid>
              <Grid item xs={1.8} container justifyContent="center">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Fecha de Venta
                </Typography>
              </Grid>
              <Grid item xs={1.5} container justifyContent="center">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Tipo de Venta
                </Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Cliente
                </Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Vendedor
                </Typography>
              </Grid>
              <Grid item xs={1} container justifyContent="center">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Estatus
                </Typography>
              </Grid>
              <Grid item xs={1.5} container justifyContent="center">
                <Typography fontSize={16} color='white' component="div">
                  Total
                </Typography>
              </Grid>
              <Grid item xs={1} container justifyContent="flex-end">
                <Typography gutterBottom fontSize={16} color='white' component="div">
                  Acciones
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {filteredSales.map((row, index) => (
          <Card key={row.saleId + index + 'l'} sx={{
            width: '100%',
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
            boxShadow:(theme) => `5px 5px 0px 0px ${theme.palette.primary.main}`,
            margin: 1,
          }}>
            <CardContent>
              <Grid container>
                <Grid item xs={1.2} container justifyContent="center">
                  <Typography gutterBottom fontSize={16} component="div">
                    <Link 
                      sx={{ cursor: 'pointer' }}
                      onClick={() => onSelectSale(row)}
                    >
                      {row.saleId}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={1.8} container justifyContent="center">
                  <Typography gutterBottom fontSize={16} component="div">
                   {row.createdAt ? formatDate(row.createdAt.toDateString()) : ''}
                  </Typography>
                </Grid>
                <Grid item xs={1.5} container justifyContent="center">
                  <Chip label={row.saleType} sx={{borderRadius: 1.6}}/>
                </Grid>
                <Grid item xs={2} container justifyContent="center">
                  <Typography gutterBottom fontSize={16} component="div">
                    {row.client}
                  </Typography>
                </Grid>
                <Grid item xs={2} container justifyContent="center">
                  <Typography gutterBottom fontSize={16} component="div">
                    {row.vendor}
                  </Typography>
                </Grid>
                <Grid item xs={1} container justifyContent="center">
                  <Typography gutterBottom fontSize={16} component="div">
                    {getChipForSaleStatus(row.status)}
                  </Typography>
                </Grid>
                <Grid item xs={1.5} container justifyContent="center">
                  <Typography fontSize={20} fontWeight="bold" component="div">
                    $ {row.total.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={1} container justifyContent="flex-end">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <SaleDetailDrawer 
        openDrawer={openDrawer} 
        setOpenDrawer={setOpenDrawer}
        saleDetail={selectedSale}
      />
      <SaleDg setOpenDg={setOpenSaleDg} openDg={openSaleDg}/>
    </div>
  )
}
