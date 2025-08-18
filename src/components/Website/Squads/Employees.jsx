import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import EmployeeCard from './Ui/EmployeeCard';
import { getAllCategory } from '../../../util/categoryHttp';
import { useAuth } from '../../../store/AuthContext';


const Employees = ({ squadData }) => {
  const { token } = useAuth();
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getAllCategory(signal, token)
  });


  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">حدث خطأ ما</Typography>
          <Typography variant="body2">{error.message}</Typography>
        </Alert>
      </Container>
    );
  }

  const categoriesData = [...data?.data] || [];

  if (data) {
    categoriesData.map((data, index) => {
      const squadLength = squadData.filter(sq => sq.categoryId === data.id);
      const squadPresent = squadData.filter(sq => sq.categoryId === data.id && sq.attendance === true);
      
      categoriesData[index].total = squadLength.length || 0;
      categoriesData[index].present = squadPresent.length || 0;
    });
  }

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
        {categoriesData.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </Box>
    </Box>
  );
};

export default Employees;