import React, { ReactNode, createContext, useContext, useState } from 'react';
import { DialogAlertContextProps } from '../interfaces/dialog-alert-context.interface';
import { DgAlert } from '../interfaces/dg-alert-context.interface';

const DialogAlertContext = createContext<DialogAlertContextProps | undefined>(undefined);

const DialogAlertContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dgAlert, setDgAlert] = useState<DgAlert>({
    title: '',
    textContent: '',
    html: '',
    open: false,
  });
  return <DialogAlertContext.Provider value={{ dgAlert, setDgAlert }}>
    {children}
  </DialogAlertContext.Provider>
}

const useDialogAlertContext = (): DialogAlertContextProps => {
  const context = useContext(DialogAlertContext);
  if(!context) {
    throw new Error('useDialogAlertContext must be used within a DialogAlertContextProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DialogAlertContextProvider, useDialogAlertContext };