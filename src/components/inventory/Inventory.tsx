import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext"

export default function Inventory(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle('Inventario')
  }, [setTitle]);

  return (<h1>Inventory</h1>)
}