import { useEffect } from "react";
import { useTitleContext } from "../../context/TitleContext";
import { getTitle } from "../../utils/get-url-path";

export default function Dashboard(): JSX.Element {
  const {setTitle} = useTitleContext();

  useEffect(() => {
    setTitle(getTitle('dashboard'));
  }, [setTitle]);
  return (<h1>Panel General</h1>)
}