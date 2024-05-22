import { useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext"
import { getTitle } from "../../utils/get-url-path";
import { Button, Grid } from "@mui/material";
import InventoryTable from "./InventoryTable";
import ArticleDg from "./ArticleDg";
import { Article } from "../../interfaces/article.interface";

export default function Inventory() {
  const {setTitle} = useTitleContext();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [openArticleDg, setOpenArticleDg] = useState<boolean>(false);

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
        article={{} as Article}
      />
      <Grid container spacing={2} paddingBottom={1}>
        <Grid item xs={8.5}/>
        <Grid item xs={1}>
          <Button 
            variant="outlined" 
            color="secondary"
            fullWidth
          >
            Importar
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button 
            variant="outlined"
            color="secondary" 
            fullWidth
          >
            Exportar
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button 
            variant="contained" 
            fullWidth
            color="secondary"
            onClick={() => setOpenArticleDg(true)}
            sx={{
              color: 'white',
            }}
          >
            Nuevo Articulo
          </Button>
        </Grid>
      </Grid>
      <InventoryTable />
    </div>
  );
}