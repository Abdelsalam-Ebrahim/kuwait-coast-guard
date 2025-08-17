import {
  Box,
  Typography,
} from '@mui/material';
import EmployeeCard from './EmployeeCard';

import { employeeData } from "../../../constants/DUMMY_DATA";


const Employees = () => {


  return (
    // i dont want to add container but i want to add some padding
    <Box sx={{ pt: 3, pb: 2, }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 600, 
          mb: 4,
          textAlign: 'center',
          color: 'text.primary'
        }}
      >
        جاهزية السرية
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 2.4,
          pb: 4,
          '@media (max-width: 600px)': {
            gap: 2,
            pb: 3
          }
        }}
      >
        {employeeData.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </Box>
    </Box>
  );
};

export default Employees;