import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function Dashboard(): JSX.Element {
  const {setTitle} = useTitleContext();
  const navigate = useNavigate();

  // Obtenemos el estado de autenticación desde Redux
  const { data, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (data.isAuthenticated && !loading) {
      setTitle(getTitle('dashboard'));
      console.log("DATAAAAAAAAAA", loading)
      return;
    }
  }, [data,setTitle, loading, navigate]);

  return (<h1>Panel General</h1>)
}