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
  Box,
  FormHelperText,
} from '@mui/material';
import Autocomplete, { 
  createFilterOptions 
} from '@mui/material/Autocomplete';
import { 
  Article,
} from '../../interfaces/article.interface';
import { Brand } from '../../interfaces/brand.interface';
import ImageUploadArea from './DragUploadImg';
import BrandDg from './BrandDg';
import { useDispatch } from 'react-redux';
import { postArticle } from '../../store/article.slice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { generateArticlePrefix } from '../../utils/id-generation';
import { ArticleStatusEnum } from '../../enum/status.enum';
import { Decimal } from 'decimal.js';

const validationArticleSchema = yup.object({
  code: yup
    .string()
    .required("El codigo es requerido"),
  name: yup
    .string()
    .required("El nombre del articulo es requerido"),
  ticketPrice: yup
    .string()
    .required("El precio ticket es requerido"),
  tax: yup
    .string()
    .required("El tax es requerido"),
  parcel: yup
    .string()
    .required("El precio de la paqueteria es requerido"),
  otherCosts: yup
    .string()
    .required("Otros costos es requerido"),
  profit: yup
    .string()
    .required("La ganancia es requerida"),
  lidShopPrice: yup
    .string()
    .required("El precio lidshop es requerido"),
  status: yup
    .string()
    .required("El estatus es requerido"),
  brandId: yup
    .string()
    .required("La marca es requerida")
});

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
}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: brandsData } = useSelector((state: RootState) => state.brands);
  const { data } = useSelector((state: RootState) => state.files)
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
  }, [brandsData]);

  const onSaveNewArticle = (newArticle: Article): void => {
    setOpenArticleDg(false);
    newArticle.code = generateArticlePrefix() + newArticle.code;
    newArticle.url = data.url || "";
    dispatch(postArticle(newArticle))
  }

  const onEditNewArticle = (): void => {
    setOpenArticleDg(false);
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

  const calculateProfit = () => {
    const ticketPrice = Decimal(formik.values.ticketPrice);
    const tax = Decimal(formik.values.tax);
    const parcel = Decimal(formik.values.parcel);
  }

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      ticketPrice: "",
      tax: "",
      parcel: "",
      otherCosts: "",
      profit: "",
      lidShopPrice: "",
      status: ArticleStatusEnum.AVAILABLE,
      brandId: "",
    }, 
    validationSchema: validationArticleSchema,
    onSubmit: (values) => {
      onSaveNewArticle(values);
    },
  });
 
  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth='md'
        open={openArticleDg}
        onClose={() => setOpenArticleDg(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <DialogTitle id="responsive-dialog-title">
            {isEditAction ? 'Editar Articulo' : 'Nuevo Articulo'}
          </DialogTitle>
          <DialogContent>
              <Grid container padding={1} spacing={2}>
                <Grid item xs={3}>
                  <TextField 
                    id="code" 
                    label="Codigo Item" 
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={formik.values.code}
                    onBlur={formik.handleBlur}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{generateArticlePrefix()}</InputAdornment>,
                    }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('code', event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    id="name" 
                    label="Item" 
                    variant="outlined" 
                    color="secondary"
                    fullWidth
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('name', event.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    value={value}
                    onChange={(_event, newValue) => {
                      if (typeof newValue === 'string') {
                        formik.setFieldValue('name', newValue);
                      } else if (newValue && newValue.inputValue) {
                        formik.setFieldValue('name', newValue.inputValue);
                      } else {
                        formik.setFieldValue('brandId', newValue?._id || '');
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
                      <TextField 
                        {...params}
                        label="Marca" 
                        error={formik.touched.brandId && Boolean(formik.errors.brandId)}
                        helperText={formik.touched.brandId && formik.errors.brandId}
                      />
                    )}
                    onBlur={formik.handleBlur}
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('ticketPrice', event.target.value)}
                    value={formik.values.ticketPrice}
                    onBlur={formik.handleBlur}
                    error={formik.touched.ticketPrice && Boolean(formik.errors.ticketPrice)}
                    helperText={formik.touched.ticketPrice && formik.errors.ticketPrice}
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
                    value={formik.values.tax}
                    onBlur={formik.handleBlur}
                    error={formik.touched.tax && Boolean(formik.errors.tax)}
                    helperText={formik.touched.tax && formik.errors.tax}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('tax', event.target.value)}
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
                    value={formik.values.parcel}
                    onBlur={formik.handleBlur}
                    error={formik.touched.parcel && Boolean(formik.errors.parcel)}
                    helperText={formik.touched.parcel && formik.errors.parcel}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('parcel', event.target.value)}
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
                    value={formik.values.otherCosts}
                    onBlur={formik.handleBlur}
                    error={formik.touched.otherCosts && Boolean(formik.errors.otherCosts)}
                    helperText={formik.touched.otherCosts && formik.errors.otherCosts}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('otherCosts', event.target.value)}
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
                    value={formik.values.profit}
                    onBlur={formik.handleBlur}
                    error={formik.touched.profit && Boolean(formik.errors.profit)}
                    helperText={formik.touched.profit && formik.errors.profit}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('profit', event.target.value)}
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
                    value={formik.values.lidShopPrice}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lidShopPrice && Boolean(formik.errors.lidShopPrice)}
                    helperText={formik.touched.lidShopPrice && formik.errors.lidShopPrice}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('lidShopPrice', event.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                    <InputLabel id="status">Estatus</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      label="Estatus"
                      value={formik.values.status}
                      onBlur={formik.handleBlur}
                      onChange={(event: SelectChangeEvent<string>) => formik.setFieldValue('status', event.target.value)} // Usa setFieldValue de Formik para actualizar el valor
                    >
                      <MenuItem value={'AVAILABLE'}>DISPONIBLE</MenuItem>
                      <MenuItem value={'RESERVED'}>APARTADO</MenuItem>
                      <MenuItem value={'SOLD_OUT'}>VENDIDO</MenuItem>
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                      <FormHelperText>{formik.errors.status}</FormHelperText>
                    )}
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
            <Button 
              //onClick={() => isEditAction ? onEditNewArticle() : onSaveNewArticle()}
              color='success'
              type="submit"
              //disabled={!formik.isValid || loading}
            >
              {isEditAction ? 'Editar' : 'Guardar'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <BrandDg openDg={openBrandDg} setOpenDg={setOpenBrandDg} brandName={newBrand}/>
    </Fragment>
  );
}
