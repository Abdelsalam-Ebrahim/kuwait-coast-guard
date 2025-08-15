import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const ContactHeader = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        mb: { xs: 3, md: 4 },
        py: { xs: 2, md: 3 }
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 2,
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
        }}
      >
        تواصل معنا
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: theme.palette.text.secondary,
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.6,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
        }}
      >
        نحن هنا للإجابة على استفساراتكم وتلقي اقتراحاتكم
      </Typography>
    </Box>
  );
}

export default ContactHeader;
