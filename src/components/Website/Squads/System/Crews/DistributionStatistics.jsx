import React from 'react';
import { Box } from '@mui/material';
import EmployeeCard from '../../Ui/EmployeeCard';

const DistributionStatistics = ({ statistics }) => {
  if(statistics <= 0) return;

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
      gap: 2, 
      mb: 2 
    }}>
      {statistics.map((stat, statIndex) => (
        <EmployeeCard key={statIndex} employee={stat} />
      ))}
    </Box>
  );
};

export default DistributionStatistics;
