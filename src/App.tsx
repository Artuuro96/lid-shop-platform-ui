import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Router from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','), // Agrega otras fuentes si es necesario
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
