import { Box, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import SystemHeader from '../SystemHeader';

const Weather = ({ onNavigateAway }) => {
  // Clear any existing navigation handlers when this component mounts
  useEffect(() => {
    if (onNavigateAway) {
      onNavigateAway(null);
    }
  }, [onNavigateAway]);
  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <SystemHeader title={"حالة الطقس"} />

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
