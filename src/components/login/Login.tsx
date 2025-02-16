import { useEffect } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import { getUrlPath } from "../../utils/get-url-path";
import { redirectTo } from "../../store/ui.slice";

// Esquema de validación con Yup
const validationSchema = yup.object({
  username: yup
    .string()
    .email("Ingresa un correo válido")
    .required("El correo es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos el estado de autenticación desde Redux
  const { data, loading } = useSelector((state: RootState) => state.auth);

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(authenticateUser(values));
    },
  });

  useEffect(() => {
    if (data.isAuthenticated && !loading) {
      dispatch(redirectTo(getUrlPath('dashboard')));
      return;
    }
  }, [data, dispatch, loading, navigate]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <TextField
                label="Usuario"
                name="username"
                type="email"
                fullWidth
                required
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                fullWidth
                required
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ borderRadius: "10px", textTransform: "none" }}
                type="submit"
                disabled={!formik.isValid || loading}
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
