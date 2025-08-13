import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const Printing = () => {
  const navigate = useNavigate();

  const printingOptions = [
    {
      id: 'attendance',
      title: 'طباعة الحضور',
      path: '/print-preview/attendance',
      icon: <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />,
      enabled: true
    },
    {
      id: 'distribution',
      title: 'طباعة التوزيع',
      path: '/print-preview/distribution',
      icon: <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />,
      enabled: true
    },
    {
      id: 'operations',
      title: 'طباعة العمليات',
      path: '/print-preview/operations',
      icon: <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />,
      enabled: false
    },
    {
      id: 'crews',
      title: 'طباعة الطواقم',
      path: '/print-preview/crews',
      icon: <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />,
      enabled: true
    },
    {
      id: 'outsiders',
      title: 'طباعة الخوارج',
      path: '/print-preview/outsiders',
      icon: <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />,
      enabled: true
    }
  ];

  const handlePrintClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
        gap: 2,
        margin: '0 auto',
        '@media (max-width: 600px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 1.5
        }
      }}
    >
      {printingOptions.map((option) => (
        <Paper
          key={option.id}
          elevation={2}
          onClick={() => option.enabled && handlePrintClick(option.path)}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 3,
            height: '100%',
            minHeight: { xs: 80, sm: 100 },
            border: '1px solid',
            borderColor: option.enabled ? 'divider' : 'grey.300',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            cursor: option.enabled ? 'pointer' : 'not-allowed',
            opacity: option.enabled ? 1 : 0.6,
            transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
            '&:hover': { 
              transform: option.enabled ? 'translateY(-3px)' : 'none', 
              boxShadow: option.enabled ? 6 : 2 
            },
            '&:focus-within': { 
              boxShadow: option.enabled ? 6 : 2 
            },
          }}
        >
          <Stack spacing={1.5} alignItems="center" textAlign="center">
            <Box sx={{
              width: { xs: 52, sm: 56 },
              height: { xs: 52, sm: 56 },
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: option.enabled ? 'primary.main' : 'grey.400',
              color: option.enabled ? 'primary.contrastText' : 'grey.600',
              boxShadow: option.enabled ? 2 : 1,
              mb: 0.5,
            }}>
              {option.icon}
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                color: option.enabled ? 'text.primary' : 'text.disabled'
              }}
            >
              {option.title}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default Printing;
