import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { AuthContext } from '../contexts/AuthContext';

const employerPages = ['İlanlarım', 'Raporlar', 'Değerlendirmeler'];
const employeePages = ['İlanlar', 'Başvurularım', 'Raporlar', 'Değerlendirmeler'];

function MyAppbar() {

  const nav = useNavigate();
  const { logout, employerUser, employeeUser, role, image } = useContext(AuthContext);
  const theme = useTheme();

  const pages = role === 'Employer' ? employerPages : employeePages;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNavMenu = (page: string) => {
    switch (page) {
      case 'İlanlarım':
        nav('/my-jobs');
        break;
      case 'İlanlar':
        nav('/jobs');
        break;
      case 'Değerlendirmeler':
        nav('/ratings');
        break;
      case 'Raporlar':
        nav('/reports');
        break;
      case 'Başvurularım':
        nav('/my-appeals');
        break;
      default:
        console.log('Default');
    }
    setAnchorElNav(null);
  }

  return (
    <AppBar
      sx={{
        height: theme.mixins.toolbar,
        background: '#F7F8FF',
        borderRadius: 0,
      }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={() => nav('/')}
            sx={{
              display: { xs: 'none', md: 'flex' },
              cursor: 'pointer',
            }}
          >
            <img
              height="37px"
              src={logo}
              alt="logo"
            />
          </Box>

          <Box
            onClick={() => nav('/')}
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              justifyContent: 'start',
            }}
          >
            <img
              height="37px"
              src={logo}
              alt="logo"
            />
          </Box>
          <Box sx={{ flexGrow: 1, mr: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => { handleClickNavMenu(page) }}
                sx={{
                  my: 2,
                  display: 'block',
                  textTransform: 'none',
                  color: theme.palette.text.primary,
                  fontSize: '17px'
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 1
            }}
          >
            <IconButton onClick={() => { nav('/settings') }}>
              <SettingsIcon color="primary" />
            </IconButton>
            <Typography
              color={theme.palette.text.primary}
              fontWeight="bold"
            >
              {role === 'Employer'
                ? employerUser?.firstName + ' ' + employerUser?.lastName
                : role === 'Employee'
                  ? employeeUser?.firstName + ' ' + employeeUser?.lastName
                  : ''
              }
            </Typography>
            <Box
              onClick={handleClick}
              sx={{
                cursor: 'pointer'
              }}
            >
              <Avatar
                src={image}
              />
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorElUser}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => { logout() }}>Çıkış</MenuItem>
            </Menu>

          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => { handleClickNavMenu(page) }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyAppbar;