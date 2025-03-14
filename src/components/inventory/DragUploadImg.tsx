import { Card, CardContent, Typography } from '@mui/material';
import LidButton from '../common/LidButton';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postFile } from '../../store/file.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


function ImageUploadArea() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.files);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageUpload = () => {
    if(selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      dispatch(postFile(formData, { 'Content-Type': 'multipart/form-data' }));
    }
  };

  return (
    <Card sx={{ p: 2, border: '2px dashed gray', boxShadow: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
        <Typography variant="body2" color="textSecondary" component="p" sx={{ mb: 2 }}>
          Arrastra un archivo hasta aquí o da click en el botón para subir una imagen
        </Typography>

        {/* Input de tipo file para la carga de la imagen */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="file-upload"
        />

        {/* Mostrar vista previa si hay una imagen seleccionada */}
        {selectedImage && (
          <Typography variant="body2" color="textSecondary" component="p" sx={{ mb: 2 }}>
            Imagen seleccionada: {selectedImage.name}
          </Typography>
        )}

        <LidButton 
          varianttype='secondary' 
          sx={{ width: '30%' }} 
          color="secondary"
          onClick={() => document.getElementById('file-upload')?.click()} // Abrir el input al hacer clic
        >
          {selectedImage ? 'Seleccionar otra Imagen' : 'Subir Imagen'}
        </LidButton>

        {/* Botón para iniciar la carga de la imagen */}
        {selectedImage && (
          <LidButton 
            varianttype='secondary' 
            sx={{ width: '30%', marginTop: 2 }} 
            color="secondary"
            onClick={handleImageUpload}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Subir Imagen'}
          </LidButton>
        )}
      </CardContent>
    </Card>
  );
}

export default ImageUploadArea;
