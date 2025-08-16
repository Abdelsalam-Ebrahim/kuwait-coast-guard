import React from 'react';
import { Typography } from '@mui/material';

const WeatherHeader = () => {
  return (
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
      حالة الطقس
    </Typography>
  );
}

export default WeatherHeader;
