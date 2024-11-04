import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { useState } from 'react';

type AppContextProps = {
  children: React.ReactNode;
}

type AppStateType = {
  showAlert: (messageText: string, severityText: AlertColor) => void;
  initialRouteDone?: boolean;
  setInitialRouteDone?: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppState: AppStateType = {
  showAlert: (messageText: string, severityText: AlertColor) => { }
  , initialRouteDone: false
  , setInitialRouteDone: () => { }
}

export const AppContext = React.createContext<AppStateType>(initialAppState);


export default function AppProvider({ children }: AppContextProps) {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor | undefined>('success');
  const [initialRouteDone, setInitialRouteDone] = useState(false);

  const showAlert = (
    messageText: string,
    severityText: AlertColor
  ) => {
    setMessage(messageText);
    setSeverity(severityText);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <AppContext.Provider
      value={{
        showAlert,
        initialRouteDone,
        setInitialRouteDone
      }}>
      {
        children
      }
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
}
