import { useEffect, useState } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";
import { 
  Avatar, 
  Card, 
  CardActions, 
  CardHeader, 
  Chip, 
  Divider, 
  Grid, 
  IconButton, 
  InputBase, 
  Paper 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import LidButton from "../common/LidButton";
import ClientDetailDrawer from "./ClientDetailDrawer";
import { ClientDetail } from "../../interfaces/client-detail.interface";

export default function Clients(): JSX.Element {
  const {setTitle} = useTitleContext();
  const [openClientDrawer, setOpenClientDrawer] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<ClientDetail>({} as ClientDetail);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectClient = (client: ClientDetail) => {
    setSelectedClient(client)
    setOpenClientDrawer(true);
  }
  const clients = [
    {
      name: 'Alicia',
      lastName: 'Cervantes Herrera',
      age: 30,
      email: 'alicia@gmail.com',
      points: 8.5,
      address: 'Lomas de Guadalupe, Atizapan de Zaragoza',
      cellphone: '443325923'
    },
    {
      name: 'Blanca',
      lastName: 'Felix Castro',
      age: 32,
      email: 'blanca@gmail.com',
      points: 8.5,
      address: 'Calacoaya, Atizapan de Zaragoza',
      cellphone: '553338923',
    },
    {
      name: 'Carolina',
      lastName: 'Jaramillo Quintero',
      age: 29,
      email: 'carolina@gmail.com',
      points: 10,
      address: 'El Mirador, Tlalnepantla de Baz',
      cellphone: '553338923',
      sales: [
        {
          saleId: 'V202401',
          total: 2930.50,
          createdAt: new Date(),
          saleType: 'CREDITO',
          client: 'Arturo Rodríguez',
          vendor: 'Daniela Martínez',
          status: 'DELIVERED',
          payments: [
            {
              id: '908901',
              number: 1,
              quantity: 500,
              createdAt: new Date('05/05/2024'),
              receivedBy: 'Lorena Martinez',
              status: 'CONFIRMED'
            },
            {
              id: '908892',
              number: 2,
              quantity: 200,
              createdAt: new Date('06/06/2024'),
              receivedBy: 'Daniela Martínez',
              status: 'PENDING' 
            },
            {
              id: '908892',
              number: 3,
              quantity: 200,
              createdAt: new Date('07/07/2024'),
              receivedBy: 'Daniela Martínez',
              status: 'PENDING'
            },
          ]
        },
        {
          saleId: 'V202402',
          total: 2930.50,
          createdAt: new Date(),
          saleType: 'CREDITO',
          client: 'Arturo Rodríguez',
          vendor: 'Daniela Martínez',
          status: 'DELIVERED',
          payments: [
            {
              id: '908901',
              number: 1,
              quantity: 500,
              createdAt: new Date('05/05/2024'),
              receivedBy: 'Lorena Martinez',
              status: 'CONFIRMED'
            },
            {
              id: '908892',
              number: 2,
              quantity: 200,
              createdAt: new Date('06/06/2024'),
              receivedBy: 'Daniela Martínez',
              status: 'CONFIRMED' 
            },
            {
              id: '908892',
              number: 3,
              quantity: 200,
              createdAt: new Date('07/07/2024'),
              receivedBy: 'Daniela Martínez',
              status: 'CONFIRMED'
            },
          ]
        }
      ],
    },
    {
      name: 'Celeste',
      lastName: 'Espino Mendoza',
      age: 20,
      email: 'celeste@gmail.com',
      points: 9,
      address: 'El Manzano, Tultitlan',
      cellphone: '553338923',
    },
    {
      name: 'Araceli',
      lastName: 'Torres Munoz',
      age: 23,
      email: 'araceli@gmail.com',
      points: 5,
      address: 'San Martin de Porres, Atizapan de Zaragoza',
      cellphone: '553338923',
    },
    {
      name: 'Karla',
      lastName: 'Martinez Diaz',
      age: 25,
      email: 'karla@gmail.com',
      points: 9,
      address: 'CTM Atzacoalco, Gustavo A. Madero',
      cellphone: '553338923',
    },
    {
      name: 'Gabriela',
      lastName: 'Valenzuela Chaparro',
      age: 25,
      email: 'gaby@gmail.com',
      points: 8.5,
      address: 'Satelite, Nauclapan',
      cellphone: '553338923',
    },
    {
      name: 'Rubi',
      lastName: 'Soto Cruz',
      age: 28,
      email: 'rubi@gmail.com',
      points: 5,
      address: 'Lomas de Guadalupe, Atizapan de Zaragoza',
      cellphone: '553338923',
    }
  ]

  useEffect(() => {
    setTitle(getTitle('clients'));
  }, [setTitle]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper
          component="form"
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            border: (theme) => `2px solid ${theme.palette.success.main}`,
            boxShadow: (theme) => `6px 6px 0px ${theme.palette.success.main}`,
            height: 48,
            flex: '0 0 auto',
          }}
        >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar Cliente"
              color='success'
              inputProps={{ 'aria-label': 'search article' }}
            />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item xs={4.5}/>
      <Grid item xs={1}/>
      <Grid item xs={1}/>
      <Grid item xs={1.5}>
        <LidButton 
          varianttype={"success"} 
          sx={{
            height: 48
          }}
        >
          Nuevo Cliente
        </LidButton>
      </Grid>
      {clients.map((client, i) => {
        const intials = (client.name[0] + client.lastName[0]).toLocaleUpperCase();
        return (
          <Grid item xs={4} key={client.name + i}>
            <Card sx={{
              border: (theme) => `2px solid ${theme.palette.secondary.main}`,
              boxShadow: (theme) => `6px 6px 0px ${theme.palette.secondary.main}`,
              marginBottom: 2
            }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" sx={{bgcolor: (theme) => `${theme.palette.success.main}`}}>
                    {intials}
                  </Avatar>
                }
                action={
                  <>
                    <Chip 
                      size='small'
                      label= {i % 2 === 0 ? 'bueno' : i % 3 === 0 ? 'malo' : 'regular'} 
                      sx={{
                        borderRadius: 1.6, 
                        color: 'white',
                        bgcolor: (theme) => i % 2 === 0 ? `${theme.palette.success.main}` : i % 3 === 0 ? `${theme.palette.error.main}` : `${theme.palette.warning.main}`
                      }} 
                    />
                  </>
                }
                title={`${client.name} ${client.lastName}`}
                subheader={client.email}
                sx={{ cursor: "pointer" }}
                onClick={() => onSelectClient(client)}
              /> 
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton aria-label="edit client">
                  <EditIcon sx={{ color: (theme) => `${theme.palette.success.main}` }}/>
                </IconButton>
                <IconButton aria-label="delete client">
                  <DeleteIcon sx={{ color: (theme) => `${theme.palette.error.main}` }}/>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        )
      })} 
      <ClientDetailDrawer 
        openDrawer={openClientDrawer} 
        setOpenDrawer={setOpenClientDrawer} 
        clientDetail={selectedClient}
      />
    </Grid>
  )
}