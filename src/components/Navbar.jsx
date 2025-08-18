import { useContext, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import PATHS from '../routes/paths.js';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications'
import { FiSun, FiMoon } from 'react-icons/fi';

import { ColorModeContext } from '../theme/ThemeProvider.jsx';
import { colors } from '../constants/colors.js';
import whiteLogo from "../assets/logo-white.png";
import { useAuth } from '../store/AuthContext.jsx';


const Navbar = ({ userName = 'مستخدم', onLogout }) => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { logout } = useAuth();

  const handleLogout = () => {
    onLogout();
    logout();
  };

  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);
  const handleNavigate = (to) => {
    navigate(to);
    closeMenu();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: mode === 'dark' ? 'background.paper' : colors.primaryColor,
          color: mode === 'dark' ? 'text.primary' : 'white',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ gap: 1, justifyContent: 'space-between', flexWrap: { xs: 'wrap', md: 'nowrap' }, py: 1 }}>
            {/* Right side (RTL start): logo and statement */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
              <Avatar alt="Logo" src={whiteLogo} sx={{ bgcolor: 'transparent', width: 40, height: 40 }} />

              <Typography
                variant="h6"
                sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' }, whiteSpace: 'nowrap' }}
              >
                مـرحـبـا بـكـم فـي الـقـطـاع الاوسـط
              </Typography>
            </Box>

            {/* Center spacer to keep layout balanced */}
            <Box sx={{ flex: 1 }} />

            {/* Desktop actions */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Button 
                component={NavLink} 
                to={PATHS.root} 
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 'bold'
                  }
                }}
              >
                الصفحة الرئيسية
              </Button>

              <Button 
                component={NavLink} 
                to={PATHS.dashboard} 
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 'bold'
                  }
                }}
              >
                لوحة التحكم
              </Button>

              <Button 
                component={NavLink} 
                to={PATHS.contact} 
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 'bold'
                  }
                }}
              >
                تواصل معنا
              </Button>

              <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>ملازم اول, {userName}</Typography>
    
              <IconButton 
                component={NavLink} 
                to={PATHS.notifications} 
                color="inherit"
                aria-label="الإشعارات"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiSvgIcon-root': {
                      color: 'inherit'
                    }
                  }
                }}
              >
                <NotificationsIcon />
              </IconButton>

              <IconButton color="inherit" onClick={toggleColorMode} aria-label="تبديل الوضع">
                {mode === 'dark' ? <FiSun /> : <FiMoon />}
              </IconButton>

              <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}>تسجيل الخروج</Button>
            </Box>

            {/* Mobile: user name + menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ maxWidth: 140, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                مرحبًا، {userName}
              </Typography>
          
              <IconButton color="inherit" onClick={openMenu} aria-label="فتح القائمة">
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <MenuItem 
                  onClick={() => handleNavigate(PATHS.root)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)'
                    }
                  }}
                >
                  الصفحة الرئيسية
                </MenuItem>
              
                <MenuItem 
                  onClick={() => handleNavigate(PATHS.contact)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)'
                    }
                  }}
                >
                  تواصل معنا
                </MenuItem>

                <MenuItem 
                  onClick={() => handleNavigate(PATHS.notifications)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NotificationsIcon fontSize="small" />
                    الإشعارات
                  </Box>
                </MenuItem>

                <MenuItem 
                  onClick={() => handleNavigate(PATHS.dashboard)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)'
                    }
                  }}
                >
                  لوحة التحكم
                </MenuItem>
              
                <MenuItem onClick={() => { toggleColorMode(); closeMenu(); }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {mode === 'dark' ? <FiSun /> : <FiMoon />}
                    تبديل الوضع
                  </Box>
                </MenuItem>

                <MenuItem onClick={() => { handleLogout(); closeMenu(); }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LogoutIcon fontSize="small" />
                    تسجيل الخروج
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
