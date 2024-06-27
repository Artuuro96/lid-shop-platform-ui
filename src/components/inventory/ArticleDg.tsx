import React, { 
  SetStateAction, 
  Fragment, 
  Dispatch, 
  useState, 
  useEffect, 
  ChangeEvent 
} from 'react';
import { 
  Grid,
  InputAdornment,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
  FilterOptionsState,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import Autocomplete, { 
  createFilterOptions 
} from '@mui/material/Autocomplete';
import { 
  Article, 
  Data 
} from '../../interfaces/article.interface';
import { Brand } from '../../interfaces/brand.interface';
import ImageUploadArea from './DragUploadImg';
import BrandDg from './BrandDg';
import { useDispatch } from 'react-redux';
import { postArticle } from '../../store/article.slice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

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
}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: brandsData } = useSelector((state: RootState) => state.brand);
  const [newArticle, setNewArticle] = useState<Article>(article);
  const [value, setValue] = useState<Brand | null>(null);
  const [openBrandDg, setOpenBrandDg] = useState<boolean>(false);
  const [newBrand, setNewBrand] = useState<string>('');
  const filter = createFilterOptions<Brand>();
  const [brands, setBrands] = useState<Brand[]>(brandsData);

  useEffect(() => {
    setNewArticle(article);
  }, [article]);

  useEffect(() => {
    setBrands(brandsData)
  }, [brandsData])

  const onSaveNewArticle = (): void => {
    setOpenArticleDg(false);
    dispatch(postArticle(newArticle))
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

  const onFilterOptions = (options: Brand[], params: FilterOptionsState<Brand>): Brand[] => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue,
        name: `Añadir "${inputValue}"`,
      });
    }
    return filtered;
  }

  const onAddNewBrand = (option: string) => {
    const brandQuotes = Array.from(option.split(' ')[1])
    const brand = brandQuotes.slice(1, brandQuotes.length-1).join("");
    setNewBrand(brand);
    setOpenBrandDg(true);

  }

  const getOptionLabel = (option: string | Brand): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  }

  const onRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Brand) => {
    if(option.name.includes('Añadir')) {
      return (
        <div style={{ margin: '0px 10px 0px 10px'}} key={option.name + 'option'}>
          <Button 
            size='small'
            variant='contained'
            color='primary'
            fullWidth
            sx={{color: 'white'}}
            onClick={() => onAddNewBrand(option.name)}
          >
            {option.name}
          </Button>
        </div>
      )
    }
  
    return <li {...props} key={option.name + 'option'}>{option.name}</li>
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
                value={newArticle?.code || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange('code', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                id="item" 
                label="Item" 
                variant="outlined" 
                color="secondary"
                fullWidth
                value={newArticle?.name || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange('name', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
            <Autocomplete
              value={value}
              onChange={(_event, newValue) => {
                if (typeof newValue === 'string') {
                  handleInputChange('name', newValue);
                } else if (newValue && newValue.inputValue) {
                  handleInputChange('name', newValue.inputValue);
                } else {
                  handleInputChange('brandId', newValue?._id || '');
                  setValue(newValue)
                }
              }}
              filterOptions={onFilterOptions}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={brands}
              getOptionLabel={getOptionLabel}
              renderOption={onRenderOption}
              fullWidth
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Marca" />
              )}
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
                id="otherCosts" 
                label="Otros Costos" 
                variant="outlined" 
                color="secondary"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="start">USD</InputAdornment>,
                }}
                value={newArticle?.otherCosts || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleNumberInputChange('otherCosts', event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                id="profit" 
                label="Ganancia" 
                variant="outlined" 
                color="secondary"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="start">MXN</InputAdornment>,
                }}
                value={newArticle?.profit || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleNumberInputChange('profit', event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="status">Estatus</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  fullWidth
                  defaultValue='AVAILABLE'
                  label="Estatus"
                  value={newArticle.status || ''}
                  onChange={(event: SelectChangeEvent<string>) => handleInputChange('status', event.target.value)}
                >
                  <MenuItem value={'AVAILABLE'}>DISPONIBLE</MenuItem>
                  <MenuItem value={'RESERVED'}>APARTADO</MenuItem>
                  <MenuItem value={'SOLD_OUT'}>VENDIDO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
              <ImageUploadArea />
            </Grid>
            <Grid item xs={2}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArticleDg(false)} color='error'>
            Cerrar
          </Button>
          <Button onClick={() => isEditAction ? onEditNewArticle() : onSaveNewArticle()} color='success'>
            {isEditAction ? 'Editar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
      <BrandDg openDg={openBrandDg} setOpenDg={setOpenBrandDg} brandName={newBrand}/>
    </Fragment>
  );
}
