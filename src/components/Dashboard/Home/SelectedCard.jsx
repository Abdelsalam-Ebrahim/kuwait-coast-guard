import React from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const SelectedCard = ({ selectedItem, setSelectedItemId }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            borderBottom: 1,
            borderColor: 'divider',
            pb: 2
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {React.createElement(selectedItem.icon, { 
              sx: { fontSize: { xs: 24, sm: 30 }, color: 'primary.main' } 
            })}
            {selectedItem.title}
          </Typography>
          
          <IconButton
            aria-label="Close section"
            onClick={() => setSelectedItemId(null)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'white',
                backgroundColor: 'error.light',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ minHeight: 200 }}>
          {React.createElement(selectedItem.component)}
        </Box>
      </Paper>
    </Box>
  );
}

export default SelectedCard;
