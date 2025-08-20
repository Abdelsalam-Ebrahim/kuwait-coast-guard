import { Navigate, useParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAllEmployeesBySquad } from '../../util/employeeHttp';
import Printing from "../../components/Website/Squads/Printing";
import GroupMain from '../../components/Website/Squads/GroupMain';
import Employees from '../../components/Website/Squads/Employees';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';


const Squad = () => {

  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["allEmployees", id],
    queryFn: ({ signal }) => getAllEmployeesBySquad(signal, id, token)
  });

  
  if (isPending) {
    return (
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
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

  return (
    <Container maxWidth="lg">
      <Printing squadData={data.data} />
      <Employees squadData={data.data} />
      <GroupMain employeesData={data.data} />
    </Container>
  );
}

export default Squad;
