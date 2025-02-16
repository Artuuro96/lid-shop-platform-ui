import {
  Autocomplete, 
  Avatar, 
  Card, 
  CardActionArea, 
  CardContent, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  FilterOptionsState, 
  FormControl,
  Grid, 
  InputAdornment, 
  InputBase, 
  InputLabel, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemIcon, 
  ListItemText, 
  MenuItem, 
  Paper, 
  Select, 
  SelectChangeEvent, 
  Slide,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  createFilterOptions, 
  styled, 
  tableCellClasses
} from "@mui/material";
import { PriceChange, CreditScore, Payments, CreditCard, MobileScreenShare } from '@mui/icons-material';
import { TransitionProps } from "@mui/material/transitions";
import { ChangeEvent, Dispatch, Fragment, ReactElement, Ref, SetStateAction, forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Client } from "../../interfaces/client-detail.interface";
import LidButton from "../common/LidButton";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatDate, getNextPaymentDate } from "../../utils/date.util";
import { SaleTypeEnum } from "../../enum/sale-type.enums";
import { FrequencyEnum } from "../../enum/frequency-enum";
import { Dayjs } from "dayjs";
import { ScheduledPayments } from "../../interfaces/sale-detail.interface";
import { Sale } from "../../interfaces/sale.interface";
import { useDispatch } from "react-redux";
import { postSale } from "../../store/sale.slice";
import { SaleType } from "../../interfaces/sale-type.interface";
import { PaymentMethodEnum } from "../../enum/payment-method";
import { PaymentType } from "../../interfaces/payment-type.interface";

const saleTypes: SaleType[] = [
  {
    id: 0,
    name: "Contado",
    type: SaleTypeEnum.ONE_PAYMENT,
  },
  {
    id: 1,
    name: "Crédito",
    type: SaleTypeEnum.CREDIT,
  },
];

const paymentMethods: PaymentType[] = [
  {
    id: 0,
    name: "Efectivo",
    type: PaymentMethodEnum.CASH,
  },
  {
    id: 1,
    name: "Tarjeta de Crédito",
    type: PaymentMethodEnum.CREDIT_CARD,
  },
  {
    id: 2,
    name: "Transferencia",
    type: PaymentMethodEnum.TANSFER,
  }
]

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SaleSummaryDg({
  setOpenSummaryDg,
  openSummaryDg
}: {
  setOpenSummaryDg: Dispatch<SetStateAction<boolean>>
  openSummaryDg: boolean
}) {
  const { data: clientsData } = useSelector((state: RootState) => state.clients);
  const { shoppingList, total } = useSelector((state: RootState) => state.cart);
  const filter = createFilterOptions<Client>();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [saleTypeSelected, setSaleTypeSelected] = useState<number | null>(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number | null>(null);
  const [saleData, setSaleData] = useState<Sale>({} as Sale);
  const dispatch = useDispatch();

  useEffect(() => {
    setClients(clientsData)
  }, [clientsData]);

  const onFilterOptions = (options: Client[], params: FilterOptionsState<Client>): Client[] => {
    const filtered = filter(options, params);
    return filtered;
  }

  const onRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Client) => {
    return (
      <ListItem {...props} key={option._id}>
        <ListItemAvatar>
          <Avatar>{option.name.charAt(0)}{option.lastName.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${option.name} ${option.lastName}`} secondary={option.email} />
      </ListItem>
    )
  }

  const getOptionLabel = (option: string | Client): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return `${option.name} ${option.lastName}`
  }

  const onChangeAdvance = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.value) {
      setSaleData({
        ...saleData,
        advance: 0
      });
      return;
    }
    const advance = parseInt(event.target.value, 10);
    const remainingDebt = total - advance;
    setSaleData({
      ...saleData,
      debt: remainingDebt,
      advance,
      scheduledPayments: []
    });
  }

  const onChangeNextPayment = (date: Dayjs | null, saleData: Sale) => {
    if(!date) {
      return
    }
    const firstPayment = date.toDate();
    
    setSaleData({
      ...saleData,
      scheduledPayments: calculateScheduledPayments(firstPayment, saleData),
    });
  }

  const onSelectSaleType = (saleType: SaleType) => {
    setSaleTypeSelected(saleType.id);
    setSaleData({
      ...saleData,
      type: saleType.type,
    });
  }

  const onSelectPaymentType = (paymentType: PaymentType) => {
    setPaymentMethodSelected(paymentType.id);
    setSaleData({
      ...saleData,
      paymentMethod: paymentType.type,
    });
  }

  const createNewSale = () => {
    saleData.articles = shoppingList;
    saleData.total = total;
    saleData.vendorId = '';
    saleData.clientId = '';
    dispatch(postSale(saleData));
  }

  const calculateScheduledPayments = (paymentDate: Date, saleData: Sale): ScheduledPayments[] => {
    const scheduledPayments = [];
    const frequency = saleData.frequencyPayment;
    const incrementDays = frequency === FrequencyEnum.BIWEEKLY ? 15 : 7;
    const quantity = (total - saleData.advance) / saleData.paymentsNumber;

    for (let i = 0; i <= saleData.paymentsNumber - 1; i++) {
      const nextPaymentDate = new Date(paymentDate);

      nextPaymentDate.setDate(nextPaymentDate.getDate() + incrementDays * i);
      scheduledPayments.push({
        dateToPay: nextPaymentDate,
        quantity,
      });
    }
    return scheduledPayments;
  }

  return (
    <Fragment>
      <Dialog
        open={openSummaryDg}
        fullWidth
        maxWidth="md"
        onClose={() => setOpenSummaryDg(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Resumen de Venta</DialogTitle>
        <DialogContent>
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={6}>
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
            <Autocomplete
              value={selectedClient || ''}
              onChange={(_event, newValue) => {
                if (typeof newValue === 'string') {
                  return
                } else if (newValue && newValue.inputValue) {
                  return
                } else {
                  setSelectedClient(newValue)
                }
              }}
              filterOptions={onFilterOptions}
              disableClearable
              handleHomeEndKeys
              id="auto-complete-client"
              options={clients}
              getOptionLabel={getOptionLabel}
              renderOption={onRenderOption}
              fullWidth
              freeSolo
              renderInput={(params) => (
                <InputBase
                  fullWidth
                  {...params.InputProps}
                  inputProps={{
                    ...params.inputProps,
                    'aria-label': 'Buscar Cliente'
                  }}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Buscar Cliente"
                  color="success"
                />
              )}
            />
          </Paper>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <LidButton
              varianttype="secondary"
              onClick={createNewSale}
              sx={{
                height: 48
              }}
            >
              Crear Venta
            </LidButton>
          </Grid>
          <Grid container spacing={2} sx={{ height: 'calc(100vh - 195px)', paddingTop: 2, paddingLeft: 2}}>
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
                  border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
                }}
              >
                <CardContent 
                  sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}
                >
                  <Grid container spacing={3}>
                    {saleTypes.map((saleType, i) => (
                      <Grid item xs={6} key={saleType.name + i}>
                        <Card sx={{
                          border: (theme) => i === saleTypeSelected ? `2px solid ${theme.palette.success.main}` : `2px solid ${theme.palette.common.black}`,
                          boxShadow: (theme) => i === saleTypeSelected ? `6px 6px 0px ${theme.palette.success.main}` : `6px 6px 0px ${theme.palette.common.black}`,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <CardActionArea onClick={() => onSelectSaleType(saleType)}>
                            <CardContent 
                              style={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'row', // Cambié aquí para que los elementos estén en fila
                                alignItems: 'center',
                                justifyContent: 'flex-start', // Alinea el contenido al inicio
                                padding: '8px', // Opcional, para agregar algo de espacio
                              }}>
                              <Avatar sx={{
                                bgcolor: (theme) => i === saleTypeSelected ? theme.palette.success.main : theme.palette.common.black,
                                marginRight: '8px', 
                              }}>
                                {saleType.type === SaleTypeEnum.ONE_PAYMENT ? 
                                (<PriceChange/>) :
                                (<CreditScore />)
                                }
                              </Avatar>
                              <Typography fontSize={15} component="div" mt={1}>
                                {saleType.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel color="secondary" id="demo-select-small-label">Periodo de Pago</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={saleData.frequencyPayment}
                          label="Periodo de Pago"
                          color="secondary"
                          onChange={(event: SelectChangeEvent) => setSaleData({
                            ...saleData,
                            frequencyPayment: event.target.value as FrequencyEnum
                          })}
                        >
                          <MenuItem value={FrequencyEnum.WEEKLY}>Semanal</MenuItem>
                          <MenuItem value={FrequencyEnum.BIWEEKLY}>Quincenal</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                      <TextField 
                        color="secondary"
                        label="Pagos" 
                        fullWidth
                        value={saleData?.paymentsNumber || 0}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setSaleData({
                          ...saleData,
                          paymentsNumber: parseInt(event.target.value) || 0
                        })}
                      />                          
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                        id="advance" 
                        label="Código de Promoción" 
                        variant="outlined" 
                        value={saleData.advance}
                        onChange={onChangeAdvance}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6}>
                      <TextField 
                        id="advance" 
                        label="Adelanto" 
                        variant="outlined" 
                        value={saleData.advance}
                        onChange={onChangeAdvance}
                        fullWidth
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          endAdornment: <InputAdornment position="start">MXN</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Siguiente Pago"
                          format="DD/MM/YYYY"
                          value={getNextPaymentDate(new Date(), saleData.frequencyPayment)}
                          onChange={(value) => onChangeNextPayment(value, saleData)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {paymentMethods.map((method, i) => (
                      <Grid item xs={4} key={method.name + i}>
                        <Card sx={{
                          border: (theme) => i === paymentMethodSelected ? `2px solid ${theme.palette.success.main}` : `2px solid ${theme.palette.common.black}`,
                          boxShadow: (theme) => i === paymentMethodSelected ? `6px 6px 0px ${theme.palette.success.main}` : `6px 6px 0px ${theme.palette.common.black}`,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <CardActionArea onClick={() => onSelectPaymentType(method)}>
                            <CardContent 
                              style={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'row', // Cambié aquí para que los elementos estén en fila
                                alignItems: 'center',
                                justifyContent: 'flex-start', // Alinea el contenido al inicio
                                padding: '8px', // Opcional, para agregar algo de espacio
                              }}>
                              <Avatar sx={{
                                bgcolor: (theme) => i === paymentMethodSelected ? theme.palette.success.main : theme.palette.common.black,
                                marginRight: '8px', 
                              }}>
                                {method.name === 'Efectivo' ? 
                                (<Payments/>) :
                                method.name === 'Tarjeta de Crédito' ?
                                (<CreditCard />) :
                                (<MobileScreenShare />)
                                }
                              </Avatar>
                              <Typography fontSize={15} component="div" mt={1}>
                                {method.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item xs={12} mt={1}>
                      <Table sx={{ minWidth: '100%' }} aria-label="customized table" size="small">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">Pago</StyledTableCell>
                            <StyledTableCell align="center">Fecha</StyledTableCell>
                            <StyledTableCell align="center">Cantidad</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {saleData?.scheduledPayments?.map((scheduledPayment, i) => (
                            <StyledTableRow key={i}>
                              <StyledTableCell align="center">{i + 1}</StyledTableCell>
                              <StyledTableCell align="center">{formatDate(scheduledPayment.dateToPay.toDateString())}</StyledTableCell>
                              <StyledTableCell align="center">${scheduledPayment.quantity.toFixed(2)}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid 
              item xs={4} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                paddingLeft: 2,
              }}
            >
              <Card 
                sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
                }}
              >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', flexGrow: 1 }}>
                  {shoppingList.map((article, index) => (
                    <ListItem key={index + 'listItem'} alignItems="flex-start">
                      <ListItemText
                        primary={article.code + " - " + article.name}
                        secondary={
                          <Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              $ {article.lidShopPrice} 
                            </Typography>
                          </Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  component="div" 
                  sx={{
                    alignSelf: 'flex-end',  // Alinea el total a la derecha
                    marginRight: 2,         // Espacio desde la derecha
                    marginBottom: 2,        // Espacio desde la parte inferior
                  }}
                >
                  Total: ${total.toFixed(2)}
                </Typography>
              </Card>
            </Grid>

          </Grid>
        </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}