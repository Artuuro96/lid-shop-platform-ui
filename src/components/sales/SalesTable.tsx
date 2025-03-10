import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { ArticleStatusEnum } from '../../enum/status.enum';
import { useState, Dispatch, SetStateAction, useMemo } from 'react';
import { useDialogAlertContext } from '../../context/DialogAlertContext';
import { useDispatch } from 'react-redux';
import { deleteArticlesById } from '../../store/article.slice';
import { SaleDetail } from '../../interfaces/sale-detail.interface';
import { getChipForArticleStatus, getChipForPaymentMethod, getChipForSaleStatus, getChipForSaleType } from '../../utils/chip';
import { SaleTypeEnum } from '../../enum/sale-type.enums';
import { PaymentMethodEnum } from '../../enum/payment-method';
import { deleteSalesById } from '../../store/sale.slice';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof SaleDetail;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'saleId',
    numeric: false,
    disablePadding: true,
    label: 'ID Venta',
  },
  {
    id: 'clientId',
    numeric: false,
    disablePadding: false,
    label: 'Cliente',
  },
  {
    id: 'advance',
    numeric: true,
    disablePadding: false,
    label: 'Adelanto',
  },
  {
    id: 'debt',
    numeric: true,
    disablePadding: false,
    label: 'Restante',
  },
  {
    id: 'paymentMethod',
    numeric: true,
    disablePadding: false,
    label: 'Método de Pago',
  },
  {
    id: 'paymentsNumber',
    numeric: true,
    disablePadding: false,
    label: 'No. de Pagos',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'vendorId',
    numeric: true,
    disablePadding: false,
    label: 'Vendido Por',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Estatus',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SaleDetail) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof SaleDetail) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  setSale: Dispatch<SetStateAction<SaleDetail>>,
  selectedSalesDetail: SaleDetail[]
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const dispatch = useDispatch();
  const { numSelected, setSale, selectedSalesDetail } = props;
  const { setDgAlert } = useDialogAlertContext();

  const onEditSale = () => {
    setSale(selectedSalesDetail[0]);
  }

  const onDeleteSales = () => {
    const message = selectedSalesDetail.map(sale => `<li>${sale._id}</li>`);
    setDgAlert({
      title: '¿Estas seguro?',
      textContent: `Lo siguientes elementos serán eliminados`,
      html: `<ul>${message.join(' ')}</ul>`,
      open: true,
      onContinue: () => {
        dispatch(deleteSalesById(selectedSalesDetail.map(sale => sale._id)))
        setDgAlert({
          open: false,
          textContent: '',
          title: '',
          onContinue: () => {}
        });
      }
    });
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) => theme.palette.secondary.main,
        color: 'white',
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.secondary.main, 1),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Ventas
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          { numSelected > 1 || (<Tooltip title="Editar">
            <IconButton onClick={onEditSale}>
              <EditIcon sx={{color: 'background.default'}}/>
            </IconButton>
          </Tooltip>)}
          <Tooltip title="Eliminar">
            <IconButton onClick={onDeleteSales}>
              <DeleteIcon sx={{color: 'background.default'}}/>
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Configurar Columnas">
          <IconButton>
            <FilterListIcon sx={{ color: 'white' }}/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function SalesTable({ salesDetail, setOpenSaleDrawer }:{
  salesDetail: SaleDetail[],
  setOpenSaleDrawer: Dispatch<SetStateAction<boolean>>,
}) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof SaleDetail>('_id');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [selectedSalesDetail, setSelectedSalesDetail] = useState<SaleDetail[]>()
  const [sale, setSale] = useState<SaleDetail>({} as SaleDetail)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof SaleDetail,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = salesDetail.map((sale) => sale._id);
      setSelectedSalesDetail(salesDetail);
      setSelected(newSelected);
      return;
    }
    setSelectedSalesDetail([]);
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    const matchedSales: SaleDetail[] = [];
    newSelected.forEach(itemCode => {
      const foundItem = salesDetail.find(sale => sale._id === itemCode);
      if(foundItem) {
        matchedSales.push(foundItem);
      }
    })
    setSelectedSalesDetail(matchedSales)
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - salesDetail.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(salesDetail, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [salesDetail, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ 
        width: '100%', 
        mb: 2, 
        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
        boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
      }}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          setSale={setSale}
          selectedSalesDetail={selectedSalesDetail || []}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={salesDetail.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(String(row._id));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, String(row.saleId))}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.saleId}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      onClick={() => setOpenSaleDrawer(true)}
                    >
                      {row.saleId}
                    </TableCell>
                    <TableCell align="left">{`${row.clientId}`}</TableCell>
                    <TableCell align="left">{`$ ${row.advance}`}</TableCell>
                    <TableCell align="left">{`$ ${row.debt}`}</TableCell>
                    <TableCell align="left">{getChipForPaymentMethod(row.paymentMethod as PaymentMethodEnum)}</TableCell>
                    <TableCell align="left">{`${row.paymentsNumber}`}</TableCell>
                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                      {getChipForSaleType(row.type as SaleTypeEnum)}
                    </TableCell>
                    <TableCell align="left">{`${row.vendorId}`}</TableCell>
                    <TableCell align="left">
                      {getChipForSaleStatus(row.status)}
                    </TableCell>
                    <TableCell align="left">{`$ ${row.total}`}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={salesDetail.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}