import { AlertColor } from '@mui/lab';
import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { confirmEmail } from '../services/AuthServices';

export default function ConfirmAccount() {

  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor | undefined>('success');
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleClose = () => {
    setOpen(false);
  }

  const confirm = async (token: string, userid: string) => {
    try {
      setLoading(true);
      const res = await confirmEmail(token, userid);
      if (res.isSuccess) {
        setSeverity('success');
        setMessage(res.message);
        setOpen(true);
        nav('/login')
      } else {
        setSeverity('error');
        setMessage(res.message);
        setOpen(true);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
    }
  }

  useEffect(() => {
    const token = searchParams.get('token');
    const userid = searchParams.get('userid');

    if(token && userid)
    confirm(token,userid);


  }, [])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
