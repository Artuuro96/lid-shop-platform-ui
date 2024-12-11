import { ChangeEvent, useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext"
import { getTitle } from "../../utils/get-url-path";
import { Backdrop, CircularProgress, Divider, Grid, IconButton, InputBase, Paper, styled } from "@mui/material";
import InventoryTable from "./InventoryTable";
import ArticleDg from "./ArticleDg";
import { Data } from "../../interfaces/article.interface";
import LidButton from "../common/LidButton";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/article.slice";
import { AppDispatch, RootState } from "../../store/store";
import { fetchBrands } from "../../store/brand.slice";

export default function Inventory() {
  const {setTitle} = useTitleContext();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.article);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [openArticleDg, setOpenArticleDg] = useState<boolean>(false);
  const [articlesData, setArticlesData] = useState<Data[]>([]);
  
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
    const results = data.filter(row => {
      return row.name.includes(event.target.value)
    });
    setArticlesData(results);
  }

  const onNewArticle = () => {
    setOpenArticleDg(true);
    dispatch(fetchBrands());
  }

  useEffect(() => {
    setTitle(getTitle('inventory'));
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    dispatch(fetchArticles());
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, setTitle]);

  useEffect(() => {
    setArticlesData(data)
  }, [data])

  return (
    <div style={{ height: maxHeight, width: '100%' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            onClick={onNewArticle}
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