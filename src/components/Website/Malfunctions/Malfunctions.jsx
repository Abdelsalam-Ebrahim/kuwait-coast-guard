import {
  Box,
  Typography,
} from '@mui/material';
import MalfunctionCard from './MalfunctionCard';
import { malfunctionsData } from "../../../constants/DUMMY_DATA";

const Malfunctions = () => {
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
        الاعطال
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 1.5,
          pb: 2,
        }}
      >
        {malfunctionsData.map((malfunction) => (
          <MalfunctionCard key={malfunction.id} malfunction={malfunction} />
        ))}
      </Box>
    </Box>
  );
};

export default Malfunctions;