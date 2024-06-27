import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Router from './routes'
import { BrowserRouter } from 'react-router-dom'
import palette from './pallete'
import AlertDialogSlide from './components/common/AlertDialogSlide'
import { DialogAlertContextProvider } from './context/DialogAlertContext'
import SnackbarAlert from './components/SnackBarAlert'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Nunito', 'sans-serif'].join(','), // Agrega otras fuentes si es necesario
    },
    palette,
  })

  return (
    <ThemeProvider theme={theme}>
      <SnackbarAlert />
      <DialogAlertContextProvider>
        <AlertDialogSlide />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DialogAlertContextProvider>
    </ThemeProvider>
  )
}

export default App
