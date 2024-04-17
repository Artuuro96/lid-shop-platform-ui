import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext"
import { getTitle } from "../../utils/get-url-path";

export default function Inventory(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle(getTitle('inventory'));
  }, [setTitle]);

  return (<h1>Inventory</h1>)
}