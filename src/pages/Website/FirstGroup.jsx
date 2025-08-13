import { Container, Typography, Box } from '@mui/material';
import Printing from "../../components/Website/Groups/Printing";
import GroupMain from '../../components/Website/Groups/GroupMain';
import Employees from '../../components/Website/Groups/Employees';

const FirstGroup = () => {
  return (
    <Container maxWidth="lg">
			<Printing />
      <Employees />
      <GroupMain />
    </Container>
  );
}

export default FirstGroup;
