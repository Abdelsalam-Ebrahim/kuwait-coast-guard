import { Container } from '@mui/material';
import Printing from "../../components/Website/Malfunctions/Printing";
import MalfunctionTable from "../../components/Website/Malfunctions/Malfunctions";
import GroupMain from "../../components/Website/Malfunctions/GroupMain";

const Malfunctions = () => {

	return (
		<Container maxWidth="lg">
			<Printing />
      <MalfunctionTable />
      <GroupMain />
		</Container>
	);
};

export default Malfunctions;
