import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";

export default function Sales(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle('Ventas')
  }, [setTitle]);
  return (<h1>Ventas</h1>)
}