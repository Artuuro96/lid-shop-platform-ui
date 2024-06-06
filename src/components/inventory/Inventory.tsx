import { ChangeEvent, useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext"
import { getTitle } from "../../utils/get-url-path";
import { Divider, Grid, IconButton, InputBase, Paper, styled } from "@mui/material";
import InventoryTable from "./InventoryTable";
import ArticleDg from "./ArticleDg";
import { Article, Data } from "../../interfaces/article.interface";
import { StatusEnum } from "../../enum/status.enum";
import LidButton from "../common/LidButton";
import SearchIcon from '@mui/icons-material/Search';

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


export default function Inventory() {
  const {setTitle} = useTitleContext();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [openArticleDg, setOpenArticleDg] = useState<boolean>(false);
  const [articlesData, setArticlesData] = useState<Data[]>(rows);

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

  const onSearchArticle = (event: ChangeEvent<HTMLInputElement>) => {
    const results = rows.filter(row => {
      return row.item.includes(event.target.value)
    });
    setArticlesData(results);
  }

  useEffect(() => {
    setTitle(getTitle('inventory'));
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
      <ArticleDg 
        openArticleDg={openArticleDg} 
        setOpenArticleDg={setOpenArticleDg}
        isEditAction={false}
        article={{} as Data}
      />
      <Grid container spacing={2} paddingBottom={2}>
        <Grid item xs={4}>
          <Paper
          component="form"
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            border: (theme) => `2px solid ${theme.palette.secondary.main}`,
            boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
            height: 48,
            flex: '0 0 auto',
          }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar Venta"
              color='secondary'
              onChange={onSearchArticle}
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
            component="label"
            varianttype="secondary"
            role={undefined}
            tabIndex={-1}
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
            varianttype="secondary"
            sx={{
              height: 48
            }}
          >
            Exportar
          </LidButton>
        </Grid>
        <Grid item xs={1.5}>
          <LidButton 
            varianttype="secondary"
            fullWidth
            color="secondary"
            onClick={() => setOpenArticleDg(true)}
            sx={{
              height: 48
            }}
          >
            Nuevo Articulo
          </LidButton>
        </Grid>
      </Grid>
      <InventoryTable articlesData={articlesData}/>
    </div>
  );
}