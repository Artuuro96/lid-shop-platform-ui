import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/ui.slice";


export default function SnackbarAlert(): JSX.Element {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    message: ''
  });
  const ui = useSelector((state: RootState) => state.ui)
  useEffect(() => {
    setAlert(ui)
  }, [ui])
  return (
    <Snackbar 
      sx={{minWidth: 400}} 
      open={alert.open} 
      autoHideDuration={4000} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={() => dispatch(showAlert({
        type: '',
        open: false,
        message: ''
      }))}
    >
      <Alert
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        severity={alert.type as any}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}