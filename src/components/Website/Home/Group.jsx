import React from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Reusable group card
// Props: { title: string, icon: ReactNode, onClick: () => void }
const GroupCard = ({ title, icon, onClick }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        height: '100%',
        minHeight: { xs: 180, sm: 200 },
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 },
        '&:focus-within': { boxShadow: 6 },
      }}
    >
      <Stack spacing={1.5} alignItems="center" textAlign="center">
        <Box sx={{
          width: { xs: 52, sm: 56 },
          height: { xs: 52, sm: 56 },
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 2,
          mb: 0.5,
        }}>
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.15rem' } }}>{title}</Typography>
      </Stack>

      <Button fullWidth variant="contained" sx={{ mt: 2, py: 1, fontWeight: 700 }} onClick={onClick}>
        دخول
      </Button>
    </Paper>
  )
}

export default GroupCard;
