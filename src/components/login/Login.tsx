import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/auth.slice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("=================>", import.meta.env)

  // Obtenemos el estado de autenticación desde Redux
  const { data, loading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    dispatch(authenticateUser({username, password}));
  };

  useEffect(() => {
    if(data.isAuthenticated) {
      navigate('/')
    }
    
  }, [data.isAuthenticated, navigate]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <Grid item xs={10} sm={8} md={5} lg={4}>
          <Paper elevation={3} style={{ padding: "2rem", borderRadius: "15px" }}>
            <Typography variant="h4" gutterBottom align="center" color="primary">
              Bienvenid@
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="center"
              color="textSecondary"
            >
              Inicia sesión para continuar
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <TextField
                label="Usuario"
                value={username}
                type="text"
                fullWidth
                required
                variant="outlined"
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                label="Contraseña"
                value={password}
                type="password"
                fullWidth
                required
                variant="outlined"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{
                  borderRadius: "10px",
                  textTransform: "none",
                }}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
