import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Card, CardContent, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import { formatDate } from '../../utils/date.util';
import { getChipForPaymentStatus } from '../../utils/chip';
import { ClientDetailDrawerProps } from '../../interfaces/props/client-detail-drawer-props.interface';
import LidButton from '../common/LidButton';

export default function ClientDetailDrawer({
  openDrawer,
  setOpenDrawer,
  clientDetail,
}: ClientDetailDrawerProps) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const [open, setOpen] = useState<boolean>(openDrawer);
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    setOpen(openDrawer);
  }, [openDrawer]);

  const handleNewPaymentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Lógica para manejar el evento de "Nuevo Pago"
  };

  const DrawerList = (
    <Box sx={{ width: 600, marginTop: 7, padding: 3, overflowY: 'auto', maxHeight: 'calc(100vh - 56px)' }} role="presentation">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h6" component="div">
            Compras de {clientDetail.name} {clientDetail.lastName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LidButton varianttype={'success'} onClick={handleNewPaymentClick}>Nuevo Pago</LidButton>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom component="div">
            Telefono: {clientDetail.cellphone} 
          </Typography>
        </Grid>
      </Grid>  
      {clientDetail?.sales?.map(saleItem => ( 
        <Card 
          sx={{
            border: (theme) => `2px solid ${theme.palette.success.main}`,
            boxShadow: (theme) => `6px 6px 0px ${theme.palette.success.main}`,
            marginBottom: 2
          }}
          key={saleItem.saleId}
        >
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h6" component="div">
                  {saleItem.saleId}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom fontSize={15} component="div">
                  Fecha de Próximo Pago: 28/12/1996
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom fontSize={15} component="div">
                  Pago Pendiente: $400.00
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container marginTop={1} spacing={1}>
              <Grid item xs={12}>
                <Table size="small" aria-label="spanning table" >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Pago</StyledTableCell>
                      <StyledTableCell>Fecha de Pago</StyledTableCell>
                      <StyledTableCell>Cantidad</StyledTableCell>
                      <StyledTableCell>Recibido Por</StyledTableCell>
                      <StyledTableCell align='right'>Estatus</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {saleItem?.payments?.length !== 0 ? 
                    (<TableBody>
                      {saleItem?.payments?.map((payment, index) => (
                        <TableRow key={payment.id + index}>
                          <TableCell align='left'>{payment.number}</TableCell>
                          <TableCell>
                            {payment.createdAt ? formatDate(payment.createdAt.toDateString()) : ''}
                          </TableCell>
                          <TableCell>
                            ${payment.quantity?.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {payment.receivedBy}
                          </TableCell>
                          <TableCell align='right'>
                            {getChipForPaymentStatus(payment.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>) : (<TableBody>
                      <TableRow>
                        <TableCell align='center' colSpan={5}>
                          No hay registros de pagos
                        </TableCell>
                      </TableRow>
                  </TableBody>)}
                </Table>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <div>
      <Drawer 
        anchor="right"
        open={open} 
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
