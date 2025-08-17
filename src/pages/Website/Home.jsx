import React, { useState } from "react";
import Groups from "../../components/Website/Home/Groups";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Home = () => {
	const [isSearching, setIsSearching] = useState(false);

	return (
		<Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
			<Box
				sx={{
					transform: isSearching ? 'translateY(20px)' : 'translateY(0)',
					transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
					mt: isSearching ? 0 : 3,
				}}
			>
				<Groups />
			</Box>
		</Container>
	);
}

export default Home;
