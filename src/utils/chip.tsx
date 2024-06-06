import { Chip } from "@mui/material";

export const getChipForPaymentStatus = (status: string):JSX.Element => {
  switch(status) {
    case 'PENDING': 
      return (<Chip 
        size='small'
        color='warning'
        label='PENDIENTE' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case 'CONFIRMED': 
      return (<Chip 
        size='small'
        color='success'
        label='CONFIRMADO' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
      case 'DELAYED': 
        return (<Chip 
          size='small'
          color='error'
          label='RETRASADO' 
          sx={{borderRadius: 1.6, color: 'white'}} 
        />);
    default:
      return (<Chip 
        size='small'
        label='' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
  }
}

export const getChipForSaleStatus = (status: string): JSX.Element => {
  switch(status) {
    case 'DELIVERED': 
      return (<Chip 
        size='small'
        color='success'
        label='Entregado' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case 'PENDING': 
      return (<Chip 
        size='small'
        color='warning'
        label='Pendiente' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
      case 'PROCESSED': 
        return (<Chip 
          size='small'
          color='info'
          label='Procesado' 
          sx={{borderRadius: 1.6, color: 'white'}} 
        />);
    default:
      return (<Chip 
        size='small'
        label='' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
  }
}