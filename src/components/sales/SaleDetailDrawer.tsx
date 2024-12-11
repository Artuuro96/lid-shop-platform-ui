import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Card, CardContent, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import { SaleDetail } from '../../interfaces/sale-detail.interface';
import { formatDate } from '../../utils/date.util';
import { SaleDetailDrawerProps } from '../../interfaces/props/sale-detail-drawer-props.interface';
import { getChipForPaymentStatus, getChipForSaleStatus } from '../../utils/chip';

export default function SaleDetailDrawer({
  openDrawer,
  setOpenDrawer,
  saleDetail,
}: SaleDetailDrawerProps) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const [open, setOpen] = useState<boolean>(openDrawer);
  const [sale, setSale] = useState<SaleDetail>(saleDetail)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    setOpen(openDrawer);
    setSale(saleDetail);
  }, [openDrawer, saleDetail])

  const DrawerList = (
    <Box sx={{ width: 600, marginTop: 7, padding: 3 }} role="presentation" onClick={toggleDrawer(false)}>
      <Card sx={{
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
        marginBottom: 2
      }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h6" component="div">
                {sale.saleId}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography gutterBottom variant="h6" component="div">
                {getChipForSaleStatus(sale.status)}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container marginTop={1} spacing={1}>
            <Grid item xs={6}>
              <Typography fontSize={15}>
                Tipo de Venta: {sale.saleType} 
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography fontSize={15}>
                Vendedor: {sale.vendor} 
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={15}>
                Cliente: {sale.client} 
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography fontSize={15}>
                Fecha de Venta: {sale.createdAt ? formatDate(sale.createdAt.toDateString()) : ''} 
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Table size="small" aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Código</StyledTableCell>
                    <StyledTableCell>Item</StyledTableCell>
                    <StyledTableCell align='right'>Precio</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sale?.items?.map((item) => (
                    <TableRow key={item.itemCode}>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell align='right'>$ {item.lidShopPrice?.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontWeight: 'bold'}}>Total</TableCell>
                    <TableCell align='right' sx={{fontWeight: 'bold'}}>
                      $ {sale.total?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
        marginBottom: 2
      }}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h6" component="div">
                Pagos
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
              <Table size="small" aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Pago</StyledTableCell>
                    <StyledTableCell>Fecha de Pago</StyledTableCell>
                    <StyledTableCell>Cantidad</StyledTableCell>
                    <StyledTableCell>Recibido Por</StyledTableCell>
                    <StyledTableCell align='right'>Estatus</StyledTableCell>
                  </TableRow>
                </TableHead>
                {sale?.payments?.length !== 0 ? 
                  (<TableBody>
                    {sale?.payments?.map((payment, index) => {
                      return (
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
                      )
                  })}
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