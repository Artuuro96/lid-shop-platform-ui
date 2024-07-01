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
import { StatusEnum } from '../../enum/status.enum';
import { Chip } from '@mui/material';
import ArticleDg from './ArticleDg';
import { Data } from '../../interfaces/article.interface';
import { useState, Dispatch, SetStateAction, useMemo } from 'react';
import { useDialogAlertContext } from '../../context/DialogAlertContext';
import { useDispatch } from 'react-redux';
import { deleteArticlesById } from '../../store/article.slice';

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
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Código Item',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Item',
  },
  {
    id: 'ticketPrice',
    numeric: true,
    disablePadding: false,
    label: 'Precio Ticket',
  },
  {
    id: 'tax',
    numeric: true,
    disablePadding: false,
    label: 'Tax',
  },
  {
    id: 'parcel',
    numeric: true,
    disablePadding: false,
    label: 'Paqueteria',
  },
  {
    id: 'otherCosts',
    numeric: true,
    disablePadding: false,
    label: 'Gastos Varios',
  },
  {
    id: 'lidShopPrice',
    numeric: true,
    disablePadding: false,
    label: 'Precio LidShop',
  },
  {
    id: 'profit',
    numeric: true,
    disablePadding: false,
    label: 'Ganancia',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Estatus',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
  setArticle: Dispatch<SetStateAction<Data>>,
  setOpenArticle: Dispatch<SetStateAction<boolean>>
  selectedArticles: Data[]
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const dispatch = useDispatch();
  const { numSelected, setOpenArticle, setArticle, selectedArticles } = props;
  const { setDgAlert } = useDialogAlertContext();

  const onEditItem = () => {
    setArticle(selectedArticles[0]);
    setOpenArticle(true);
  }

  const onDeleteItems = () => {
    const message = selectedArticles.map(article => `<li>${article.code}</li>`);
    setDgAlert({
      title: '¿Estas seguro?',
      textContent: `Lo siguientes elementos serán eliminados`,
      html: `<ul>${message.join(' ')}</ul>`,
      open: true,
      onContinue: () => {
        dispatch(deleteArticlesById(selectedArticles.map(article => article._id)))
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
        bgcolor: (theme) => theme.palette.primary.main,
        color: 'white',
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, 1),
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
          Articulos
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          { numSelected > 1 || (<Tooltip title="Editar">
            <IconButton onClick={() => onEditItem()}>
              <EditIcon sx={{color: 'background.default'}}/>
            </IconButton>
          </Tooltip>)}
          <Tooltip title="Eliminar">
            <IconButton onClick={() => onDeleteItems()}>
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

export default function InventoryTable({ articlesData }:{
  articlesData: Data[],
}) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('ticketPrice');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Data[]>()
  const [openArticleDg, setOpenArticleDg] = useState<boolean>(false);
  const [article, setArticle] = useState<Data>({} as Data)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = articlesData.map((article) => article.code);
      setSelectedArticles(articlesData);
      setSelected(newSelected);
      return;
    }
    setSelectedArticles([]);
    setSelected([]);
  };

  const getColorStatus = (status: StatusEnum): string => {
    switch(status) {
      case StatusEnum.AVAILABLE: 
        return 'success';
      case StatusEnum.RESERVED:
        return 'warning'
      case StatusEnum.SOLD_OUT:
        return 'info'
    }
  }

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
    const matchedArticles: Data[] = [];
    newSelected.forEach(itemCode => {
      const foundItem = articlesData.find(article => article.code === itemCode);
      if(foundItem) {
        matchedArticles.push(foundItem);
      }
    })
    setSelectedArticles(matchedArticles)
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articlesData.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(articlesData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [articlesData, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ 
        width: '100%', 
        mb: 2, 
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        boxShadow: (theme) => `6px 6px 0px ${theme.palette.primary.main}`,
      }}>
        <ArticleDg 
          openArticleDg={openArticleDg} 
          setOpenArticleDg={setOpenArticleDg}
          isEditAction={true}
          article={article}
        />
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          setArticle={setArticle}
          setOpenArticle={setOpenArticleDg}
          selectedArticles={selectedArticles || []}
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
              rowCount={articlesData.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.code);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.code)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.code}
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
                    >
                      {row.code}
                    </TableCell>
                    <TableCell align="left">{row.name.toUpperCase()}</TableCell>
                    <TableCell align="left">{`$ ${row.ticketPrice}`}</TableCell>
                    <TableCell align="left">{`$ ${row.tax}`}</TableCell>
                    <TableCell align="left">{`$ ${row.parcel}`}</TableCell>
                    <TableCell align="left">{`$ ${row.otherCosts}`}</TableCell>
                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                      <Chip label={`$ ${row.lidShopPrice}`} color="secondary" variant='outlined' />
                    </TableCell>
                    <TableCell align="left">{`$ ${row.profit}`}</TableCell>
                    <TableCell align="left">
                      <Chip 
                        label={row.status} 
                        sx={{ color: 'white'}} 
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        color={getColorStatus(row.status) as any}
                      />
                    </TableCell>
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
          count={articlesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}