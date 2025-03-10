import { Chip } from "@mui/material";
import { SaleTypeEnum } from "../enum/sale-type.enums";
import { PaymentMethodEnum } from "../enum/payment-method";
import { ArticleStatusEnum } from "../enum/status.enum";

export const getChipForSaleType = (status: SaleTypeEnum):JSX.Element => {
  switch(status) {
    case SaleTypeEnum.CREDIT: 
      return (<Chip 
        size='small'
        color='success'
        label='CRÉDITO' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case SaleTypeEnum.ONE_PAYMENT: 
      return (<Chip 
        size='small'
        color='warning'
        label='CONTADO' 
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

export const getChipForPaymentMethod = (status: PaymentMethodEnum): JSX.Element => {
  switch(status) {
    case PaymentMethodEnum.CASH: 
      return (<Chip 
        size='small'
        color='secondary'
        label='EFECTIVO' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case PaymentMethodEnum.TANSFER: 
      return (<Chip 
        size='small'
        color='primary'
        label='TRANSFERENCIA' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case PaymentMethodEnum.CREDIT_CARD: 
      return (<Chip 
        size='small'
        color='warning'
        label='TARJETA DE CRÉDITO' 
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

export const getChipForArticleStatus = (status: ArticleStatusEnum): JSX.Element => {
  switch(status) {
    case ArticleStatusEnum.AVAILABLE: 
      return (<Chip 
        size='small'
        color='success'
        label='DISPONIBLE' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case ArticleStatusEnum.RESERVED: 
      return (<Chip 
        size='small'
        color='warning'
        label='APARTADO' 
        sx={{borderRadius: 1.6, color: 'white'}} 
      />);
    case ArticleStatusEnum.SOLD_OUT: 
      return (<Chip 
        size='small'
        color='info'
        label='VENDIDO' 
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