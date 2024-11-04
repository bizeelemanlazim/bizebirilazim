import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { refreshToken as refreshTkn } from '../services/AuthServices'
import { AuthContext } from '../contexts/AuthContext';

type GuardProps = {
  children: React.ReactNode;
}

const nonAuthRoutes = ['/login', '/register/employer', '/register/employee', '/api/v1/Auth/ConfirmEmail', '/api/v1/Auth/ForgotPassword'];

export default function Guard({ children }: GuardProps) {

  const { exp, refreshToken, logout, initialAuthDone, login } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const nav = useNavigate();
  const loc = useLocation();

  const refresh = async () => {
      try {
          setRefreshing(true);
          const res = await refreshTkn(refreshToken);
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('refreshToken', res.data.refreshToken)
          login && login(res.data.token);
          setRefreshing(false);
      } catch (err) {
          console.log(err);
          logout && logout();
          setRefreshing(false);
      }
  }

  useEffect(() => {
      if (!exp && !nonAuthRoutes.includes(loc.pathname)) {
          nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
      }

      if (exp && nonAuthRoutes.includes(loc.pathname)) {
          const qs = new URLSearchParams(loc.search);
          let redirectUrl = qs.get('redirect');
          if (redirectUrl) {
              redirectUrl += '?' + qs.get('redirectQs');
          } else {
              redirectUrl = '/';
          }
          nav(redirectUrl, { replace: true });

      }

      if (exp) {
          if (exp < new Date()) {
              if (refreshToken) {
                  refresh();

              } else {
                  if (!nonAuthRoutes.includes(loc.pathname) && initialAuthDone) {
                      nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
                      logout!();
                  }
              }
          }
      } else {
          if (!nonAuthRoutes.includes(loc.pathname) && initialAuthDone) {
              nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
              logout!();
          }
      }

      // if (exp && exp < new Date() && !nonAuthRoutes.includes(loc.pathname)) {
      //     nav(`/login?redirect=${loc.pathname}&redirectQs=${loc.search.slice(1)}`, { replace: true });
      //     logout!();
      // }

  }, [loc.pathname, exp])

  if (refreshing) return (
      <Box
          sx={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
          }}
      >
          <CircularProgress />
      </Box>
  )

  if (!exp) return null;

  return (
      <div>{children}</div>
  )
}

