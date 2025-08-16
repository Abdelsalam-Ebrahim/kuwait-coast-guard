import {
  Box,
  Typography,
  useTheme
} from '@mui/material';
import EmployeeCard from './EmployeeCard';


const Employees = () => {

  const employeeData = [
    {
      id: 1,
      title: 'ضباط',
      total: 25,
      present: 22,
      missing: 3,
    },
    {
      id: 2,
      title: 'نواخذة',
      total: 18,
      present: 16,
      missing: 2,
    },
    {
      id: 3,
      title: 'بحرية',
      total: 12,
      present: 11,
      missing: 1,
    },
    {
      id: 4,
      title: 'مدني فني',
      total: 8,
      present: 7,
      missing: 1,
    },
    {
      id: 5,
      title: 'مهني فني',
      total: 6,
      present: 6,
      missing: 0,
    },
    {
      id: 6,
      title: 'مهني طباخ',
      total: 4,
      present: 4,
      missing: 0,
    },
    {
      id: 7,
      title: 'الجيس البنغالي فني',
      total: 10,
      present: 9,
      missing: 1,
    },
    {
      id: 8,
      title: 'الجيش البنغالي طباخ',
      total: 7,
      present: 6,
      missing: 1,
    }
  ];

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