import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";

export default function Clients(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle('Clientes')
  }, [setTitle]);
  return (<h1>Clientes</h1>)
}