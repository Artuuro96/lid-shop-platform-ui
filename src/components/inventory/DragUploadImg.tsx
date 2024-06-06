import { Card, CardContent, Typography } from '@mui/material';
import LidButton from '../common/LidButton';

function ImageUploadArea() {
  return (
    <Card sx={{ p: 2, border: '2px dashed gray', boxShadow: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
        <Typography variant="body2" color="textSecondary" component="p" sx={{ mb: 2 }}>
            Arrastra un archivo hasta aqui o da click en el boton para subir una imagen
        </Typography>
        <LidButton varianttype='secondary' sx={{width: '30%'}} color="secondary">
          Subir
        </LidButton>
      </CardContent>
    </Card>
  );
}

export default ImageUploadArea;
