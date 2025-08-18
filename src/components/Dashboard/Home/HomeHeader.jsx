import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const HomeHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <Box sx={{ mb: 4, textAlign: 'center' }}>
    <Typography
      variant={isMobile ? 'h4' : 'h3'}
      component="h1"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        mb: 2
      }}
    >
      لوحة التحكم الإدارية
    </Typography>

    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
    >
      إدارة شاملة للنظام والمستخدمين
    </Typography>
  </Box>
  );
}

export default HomeHeader;
