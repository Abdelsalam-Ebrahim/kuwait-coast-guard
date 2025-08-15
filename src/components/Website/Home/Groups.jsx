import React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import GroupIcon from '@mui/icons-material/Group'
import GroupsIcon from '@mui/icons-material/Groups'
import SchoolIcon from '@mui/icons-material/School'
import BuildIcon from '@mui/icons-material/Build'
import ListAltIcon from '@mui/icons-material/ListAlt'
import GroupCard from './Group'

const items = [
  { key: 'first', title: 'السرية الأولى', to: '/first-group', icon: <GroupIcon /> },
  { key: 'second', title: 'السرية الثانية', to: '/second-group', icon: <GroupsIcon /> },
  { key: 'third', title: 'السرية الثالثة', to: '/third-group', icon: <GroupIcon /> },
  { key: 'courses', title: 'الدورات', to: '/courses', icon: <SchoolIcon /> },
  { key: 'malfunctions', title: 'الأعطال', to: '/malfunctions', icon: <BuildIcon /> },
  { key: 'record', title: 'السجل العام', to: '/public-register', icon: <ListAltIcon /> },
]

const Groups = () => {
  const navigate = useNavigate()

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
        {items.map((item) => (
          <GroupCard
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

export default Groups
