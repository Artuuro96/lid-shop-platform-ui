import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete, 
  Avatar, 
  Card, 
  CardActionArea, 
  CardContent, 
  Checkbox, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  FilterOptionsState, 
  FormControlLabel, 
  FormGroup, 
  Grid, 
  InputAdornment, 
  InputBase, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Paper, 
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
import { TransitionProps } from "@mui/material/transitions";
import { ChangeEvent, Dispatch, Fragment, ReactElement, Ref, SetStateAction, forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Client } from "../../interfaces/client-detail.interface";
import LidButton from "../common/LidButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatDate, getNextPaymentDate } from "../../utils/date.util";
import { SaleTypeEnum } from "../../enum/sale-type.enums";
import { FrequencyEnum } from "../../enum/frequency-enum";
import { Dayjs } from "dayjs";
import { ScheduledPayments } from "../../interfaces/sale-detail.interface";
import { Sale } from "../../interfaces/sale.interface";

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
  const [value, setValue] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [payamentMethods] = useState(["Efectivo", "Tarjeta de Crédito", "Transferencia"]);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(0);
  const [saleData, setSaleData] = useState<Sale>({} as Sale);

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

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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

  const onSelectPaymentMethod = (paymentMethod: number) => {
    setSaleData({
      ...saleData,
      paymentMethod
    })
  }

  const createNewSale = () => {
    console.log("=============> saleData", saleData);
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
              value={value || ''}
              onChange={(_event, newValue) => {
                if (typeof newValue === 'string') {
                  return
                } else if (newValue && newValue.inputValue) {
                  return
                } else {
                  setValue(newValue)
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
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{bgcolor: (theme) => saleData.type ? theme.palette.success.main : theme.palette.grey[100]}}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Tipo de Venta
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value="start"
                          control={
                            <Checkbox 
                              color="secondary"
                              onChange={() => setSaleData({
                                ...saleData,
                                type: SaleTypeEnum.ONE_PAYMENT
                              })}
                              checked={saleData.type === SaleTypeEnum.ONE_PAYMENT}
                            />
                          }
                          label="Contado"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="start"
                          control={
                            <Checkbox 
                              color="secondary"
                              onChange={() => setSaleData({
                                ...saleData,
                                type: SaleTypeEnum.CREDIT
                              })}
                              checked={saleData.type === SaleTypeEnum.CREDIT}
                            />
                          }
                          label="Diferido a Pagos"
                          labelPlacement="start"
                        />
                      </FormGroup>
                    </Grid>
                  </AccordionDetails>
                  </Accordion>
                  <Accordion 
                    expanded={expanded === 'panel2'} 
                    onChange={handleChange('panel2')} 
                    disabled={saleData.type !== SaleTypeEnum.CREDIT}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                      sx={{
                        bgcolor: (theme) => {
                          if(saleData.type && saleData.paymentsNumber !== 0) {
                            return theme.palette.success.main;
                          }
                          return theme.palette.grey[100];
                        }
                      
                      }}
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>Periodo de Pagos</Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container justifyContent="center">
                        <FormGroup aria-label="position" row>
                          <Grid item xs={4.5} >
                            <FormControlLabel
                              value=""
                              control={
                                <Checkbox 
                                  checked={saleData.frequencyPayment === FrequencyEnum.WEEKLY}
                                  color="secondary"
                                  onChange={() => setSaleData({
                                  ...saleData,
                                  frequencyPayment: FrequencyEnum.WEEKLY
                                })}/>
                            }
                              label="Semanal"
                              labelPlacement="start"
                            />
                          </Grid>
                          <Grid item xs={4.5} >
                            <FormControlLabel
                              value=""
                              control={
                                <Checkbox 
                                  checked={saleData.frequencyPayment === FrequencyEnum.BIWEEKLY}
                                  color="secondary"
                                  onChange={() => setSaleData({
                                  ...saleData,
                                  frequencyPayment: FrequencyEnum.BIWEEKLY
                                })}/>
                              }
                              label="Quincenal"
                              labelPlacement="start"
                            />
                          </Grid>
                          <Grid item xs={3} >
                            <TextField 
                              color="secondary"
                              size="small" 
                              label="Pagos" 
                              value={saleData?.paymentsNumber || 0}
                              onChange={(event: ChangeEvent<HTMLInputElement>) => setSaleData({
                                ...saleData,
                                paymentsNumber: parseInt(event.target.value) || 0
                              })}
                            />                          
                          </Grid>
                        </FormGroup>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion 
                    expanded={expanded === 'panel3'} 
                    onChange={handleChange('panel3')}
                    disabled={saleData.type !== SaleTypeEnum.CREDIT}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                      sx={{bgcolor: (theme) => theme.palette.grey[100]}}
                    >
                      <Typography sx={{ width: '50%', flexShrink: 0 }}>
                        Adelanto y Programación de pagos
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography textAlign='center' variant="h5"> Total: ${total.toFixed(2)}</Typography>
                        </Grid>
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
                        <Grid item xs={12}>
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
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                      sx={{bgcolor: (theme) => theme.palette.grey[200]}}
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>Metodo de Pago</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {payamentMethods.map((method, i) => (
                          <Grid item xs={4} key={method + i}>
                            <Card sx={{
                              border: (theme) => i === paymentMethodSelected ? `2px solid ${theme.palette.success.main}` : `2px solid ${theme.palette.common.black}`,
                              boxShadow: (theme) => i === paymentMethodSelected ? `6px 6px 0px ${theme.palette.success.main}` : `6px 6px 0px ${theme.palette.common.black}`,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                              <CardActionArea onClick={() => onSelectPaymentMethod(i)}>
                                <CardContent 
                                  style={{ 
                                    textAlign: 'center', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center' 
                                  }}>
                                  <Avatar sx={{ width: 50, height: 50, mb: 1, bgcolor: (theme) => i === paymentMethodSelected ? theme.palette.success.main : theme.palette.common.black}}>
                                    {method === 'Efectivo' ? 
                                    (<PaymentsIcon/>) : method === 'Transferencia' ? 
                                    (<MobileScreenShareIcon />) : (<CreditCardIcon />)
                                    }
                                  </Avatar>
                                  <Typography fontSize={15} component="div" mt={1}>
                                    {method}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  
                </CardContent>
              </Card>
            </Grid>
            <Grid 
              item xs={4} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                paddingLeft: 2 ,
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
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {shoppingList.map((article, index) => (
                    <ListItem key={index + 'listItem'} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
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
              </Card>
            </Grid>
          </Grid>
        </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}