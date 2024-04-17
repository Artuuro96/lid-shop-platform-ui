import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";

export default function Sales(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle(getTitle('sales'));
  }, [setTitle]);
  return (<h1>Ventas</h1>)
}