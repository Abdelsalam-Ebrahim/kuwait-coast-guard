import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

const Weather = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          حالة الطقس
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          هنا يتم عرض معلومات الطقس والظروف الجوية.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            يمكنك إضافة مكونات معلومات الطقس هنا...
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Weather;
