import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group'
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SquadCard from './SquadCard';


const items = [
  { key: 'courses', title: 'الدورات', to: '/courses', icon: <SchoolIcon /> },
  { key: 'malfunctions', title: 'الأعطال', to: '/malfunctions', icon: <BuildIcon /> },
  { key: 'record', title: 'السجل العام', to: '/public-register', icon: <ListAltIcon /> },
];

const Squads = ({ squads }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {squads.map(squad => (
          <SquadCard
            key={squad.id}
            title={squad.name}
            icon={<GroupIcon />}
            onClick={() => navigate('/squad/' + squad.id)}
          />
        ))}

        {items.map((item) => (
          <SquadCard
            key={item.key}
            title={item.title}
            icon={item.icon}
            onClick={() => navigate(item.to)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Squads;
