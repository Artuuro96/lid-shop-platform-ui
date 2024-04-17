import React, { ReactNode, createContext, useContext, useState } from 'react';
import { TitleContextProps } from '../interfaces/title-context.interface';
const TitleContext = createContext<TitleContextProps | undefined>(undefined);

const TitleContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  return <TitleContext.Provider value={{ title, setTitle }}>
    {children}
  </TitleContext.Provider>
}

const useTitleContext = (): TitleContextProps => {
  const context = useContext(TitleContext);
  if(!context) {
    throw new Error('useTitleContext must be used within a TitleContextProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TitleContextProvider, useTitleContext };