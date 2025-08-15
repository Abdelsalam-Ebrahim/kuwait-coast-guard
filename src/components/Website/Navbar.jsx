import { useContext, useMemo, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import PATHS from '../../routes/paths.js';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { FiSun, FiMoon } from 'react-icons/fi'
import { ColorModeContext } from '../../theme/ThemeProvider.jsx'
import { colors } from '../../constants/colors.js'
import whiteLogo from "../../assets/logo-white.png";

const Navbar = ({ userName: userNameProp, onLogout }) => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const userName = useMemo(() => userNameProp || localStorage.getItem('userName') || 'مستخدم', [userNameProp]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    navigate(PATHS.login);
    try {
      if (onLogout) onLogout();
      // default behavior: clear a generic auth key and go to login
      localStorage.removeItem('auth');
      navigate(PATHS.login);
    } catch (error) {
      navigate(PATHS.login);
    }
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
              <Button component={NavLink} to={PATHS.root} color="inherit">الصفحة الرئيسية</Button>
              <Button component={NavLink} to={PATHS.notifications} color="inherit">الإشعارات</Button>
              <Button component={NavLink} to={PATHS.dashboard} color="inherit">لوحة التحكم</Button>
              <Button component={NavLink} to={PATHS.contact} color="inherit">تواصل معنا</Button>
              <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>مرحبًا، {userName}</Typography>
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
                <MenuItem onClick={() => handleNavigate(PATHS.root)}>الصفحة الرئيسية</MenuItem>
                <MenuItem onClick={() => handleNavigate(PATHS.contact)}>تواصل معنا</MenuItem>
                <MenuItem onClick={() => handleNavigate(PATHS.notifications)}>الإشعارات</MenuItem>
                <MenuItem onClick={() => handleNavigate(PATHS.dashboard)}>لوحة التحكم</MenuItem>
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
