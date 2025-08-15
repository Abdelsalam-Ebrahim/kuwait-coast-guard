import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const MalfunctionHeader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: { xs: 3, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 2,
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
        }}
      >
        بلاغ الأعطال
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.6,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
        }}
      >
        يرجى تعبئة البيانات التالية لإرسال بلاغ العطل
      </Typography>
    </Box>
  );
};

export default MalfunctionHeader;
