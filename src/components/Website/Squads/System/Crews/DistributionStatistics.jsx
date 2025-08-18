import React from 'react';
import { Box } from '@mui/material';
import EmployeeCard from '../../Ui/EmployeeCard';

const DistributionStatistics = ({ employees }) => {
  const statistics = employees.length > 0 ? employees[0].statistics : [];
  
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
