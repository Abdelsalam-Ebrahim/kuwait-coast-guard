import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DistributionStatistics from './DistributionStatistics';
import DistributionTable from './DistributionTable';

const DistributionTables = ({ distribution }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        mb: { xs: 3, sm: 2, lg: 0 }, 
        height: 'fit-content', 
        width: '100%',
        p: 2,
        border: '2px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.08)',
        borderRadius: 3,
        background: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main + '40',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        component="h2" 
        sx={{ 
          fontWeight: 600,
          mb: { xs: 1.5, sm: 2 },
          color: 'primary.main',
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.1rem' },
          textAlign: { xs: 'center', sm: 'left' },
          pb: 1,
          borderBottom: '2px solid',
          borderBottomColor: 'primary.main'
        }}
      >
        {distribution.distributionPlaceName}
      </Typography>

      <DistributionStatistics statistics={distribution.statistics} />
      <DistributionTable people={distribution.people} />
    </Box>
  );
};

export default DistributionTables;
