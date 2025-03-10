import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Backdrop, CircularProgress } from '@mui/material';
import LidButton from '../common/LidButton';
import { useEffect } from 'react';
import { getTitle } from '../../utils/get-url-path';
import { useTitleContext } from '../../context/TitleContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchPayments } from '../../store/payments.slice';

function CustomDashboard() {
  const {setTitle} = useTitleContext();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.payments)
  // Datos ficticios para las tablas
  const tableData = [
    { id: 1, name: 'Item 1', value: '$10' },
    { id: 2, name: 'Item 2', value: '$20' },
    { id: 3, name: 'Item 3', value: '$30' },
  ];

  useEffect(() => {
    setTitle(getTitle('income-expenses'));
    dispatch(fetchPayments());
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      {
        loading ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card sx={{
                  border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
                  marginBottom: 2
                }}>
                  <CardContent>
                    <Typography variant="h6">Total de Ingresos</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total de Ingresos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{
                  border: (theme) => `2px solid ${theme.palette.success.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.success.main}`,
                  marginBottom: 2
                }}>
                  <CardContent>
                    <Typography variant="h6">Total Ganancias</Typography>
                    <Typography variant="body2" color="textSecondary">
                      This is the second card. More content goes here.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{
                  border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
                  marginBottom: 2
                }}>
                  <CardContent>
                    <Typography variant="h6">Total de Egresos</Typography>
                    <Typography variant="body2" color="textSecondary">
                      This is the third card. Content is flexible and can be varied.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Segunda fila de 2 tarjetas con tablas dentro */}
              <Grid item xs={12} md={6}>
                <Card sx={{
                  border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
                  marginBottom: 2
                }}>
                  <CardContent>
                    {/* Contenedor de Grid con alineación central */}
                    <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                      <Grid item>
                        <Typography variant="h6">Ingresos</Typography>
                      </Grid>
                      <Grid item>
                        <LidButton
                          varianttype="secondary"
                          color="secondary"
                          sx={{
                            height: 38,
                            width: 'auto',  // Aseguramos que el botón no sea de tamaño completo
                          }}
                        >
                          Nuevo Ingreso
                        </LidButton>
                      </Grid>
                    </Grid>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Recibido Por</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Cantidad</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.value}</TableCell>
                              <TableCell>Value</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{
                  border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                  boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
                  marginBottom: 2
                }}>
                  <CardContent>
                    {/* Contenedor de Grid con alineación central */}
                    <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                      <Grid item>
                        <Typography variant="h6">Egresos</Typography>
                      </Grid>
                      <Grid item>
                        <LidButton
                          varianttype="secondary"
                          color="secondary"
                          sx={{
                            height: 38,
                            width: 'auto',  // Aseguramos que el botón no sea de tamaño completo
                          }}
                        >
                          Nuevo Egreso
                        </LidButton>
                      </Grid>
                    </Grid>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Cantidad</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.value}</TableCell>
                              <TableCell>Value</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
    </div>
  );
}

export default CustomDashboard;
