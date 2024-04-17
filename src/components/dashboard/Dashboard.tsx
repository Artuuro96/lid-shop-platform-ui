import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";

export default function Dashboard(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle('Panel General')
  }, [setTitle]);
  return (<h1>Panel General</h1>)
}