import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";

export default function Clients(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle(getTitle('clients'));
  }, [setTitle]);
  return (<h1>Clientes</h1>)
}