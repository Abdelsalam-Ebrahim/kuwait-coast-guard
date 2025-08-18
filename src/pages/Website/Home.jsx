import { useQuery } from "@tanstack/react-query";
import { Alert, Box, CircularProgress, Typography, Container } from "@mui/material";
import Squads from "../../components/Website/Home/Squads";
import { getAllSquads } from "../../util/squadHttp";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";


const Home = () => {
  const { token } = useContext(AuthContext);
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["squads"],
    queryFn: ({ signal }) => getAllSquads(signal, token)
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
		<Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
      <Squads squads={data.data} />
		</Container>
	);
}

export default Home;
