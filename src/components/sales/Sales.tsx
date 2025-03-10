import { ChangeEvent, useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";
import {Backdrop, CircularProgress, Divider, Grid, IconButton, InputBase, Paper, styled } from "@mui/material";
import SaleDetailDrawer from "./SaleDetailDrawer";
import { SaleDetail } from "../../interfaces/sale-detail.interface";
import SaleDg from "./SaleDg";
import LidButton from "../common/LidButton";
import SearchIcon from '@mui/icons-material/Search';
import { useDialogAlertContext } from "../../context/DialogAlertContext";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchArticles } from "../../store/article.slice";
import { fetchSales } from "../../store/sale.slice";
import { useSelector } from "react-redux";
import SalesTable from "./SalesTable";

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
  const {setDgAlert} = useDialogAlertContext();
  const dispatch = useDispatch<AppDispatch>();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { data: salesDetail, loading} = useSelector((state: RootState) => state.sales);
  const [selectedSale, setSelectedSale] = useState<SaleDetail>({} as SaleDetail);
  const [filteredSales, setFilteredSales] = useState<SaleDetail[]>(salesDetail);
  const [openSaleDg, setOpenSaleDg] = useState<boolean>(false);

  useEffect(() => {
    setFilteredSales(salesDetail);
  }, [salesDetail]);

  useEffect(() => {
    setTitle(getTitle('sales'));
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    dispatch(fetchSales());
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, setTitle]);

  const onSelectSale = (row: SaleDetail) => {
    setOpenDrawer(true); 
    setSelectedSale(row)
  }

  const onSearchSales = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const foundSales = salesDetail.filter(row => row._id.includes(event.target.value));
    setFilteredSales(foundSales)
  }

  const onOpenSaleDg = () => {
    setOpenSaleDg(true);
    dispatch(fetchArticles());
  }

  return (
    <div style={{ height: maxHeight, width: '100%' }}>
       {
        loading ? (<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>) : (
        <>
          <SaleDg setOpenDg={setOpenSaleDg} openDg={openSaleDg}/>
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
                  onChange={onSearchSales}
                  inputProps={{ 'aria-label': 'search article' }} />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={4.5} />
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
                onClick={onOpenSaleDg}
                sx={{
                  height: 48
                }}
              >
                Nueva Venta
              </LidButton>
            </Grid>
          </Grid>
          <SaleDetailDrawer 
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            saleDetail={selectedSale}
          />
          <SalesTable salesDetail={filteredSales} setOpenSaleDrawer={setOpenDrawer} />
        </>
      )}
    </div>
  )
}