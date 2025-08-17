import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

// import prints
import printCanoes from "./System/Canoes/printCanoes";
import printUnits from "./System/Units/printUnits";
import printRabs from "./System/Rabs/printRabs";
import printTampa from "./System/Tampa/printTampa";
import printConcept from "./System/Concept/printConcept";


// import dummy data
import { malfunctionsTablesData } from "../../../constants/DUMMY_DATA";

const Printing = () => {
  const printingOptions = [
    { id: 'canoes', title: 'طباعة الزوراق', enabled: true },
    { id: 'units', title: 'طباعة الوحدات', enabled: true },
    { id: 'rabs', title: 'طباعة الربس', enabled: true },
    { id: 'tampa', title: 'طباعة تامبة', enabled: true },
    { id: 'concept', title: 'طباعة الكونسبت', enabled: true }
  ];

  // Handle printing - directly open print window
  const handlePrint = (option) => {
    if (!option.enabled) return;

    if (option.id === 'canoes') {
      printCanoes('الأولى', malfunctionsTablesData);
    } else if (option.id === 'units') {
      printUnits('الأولى', malfunctionsTablesData);
    } else if (option.id === 'rabs') {
      printRabs('الأولى', malfunctionsTablesData);
    } else if (option.id === 'tampa') {
      printTampa('الأولى', malfunctionsTablesData);
    } else if (option.id === 'concept') {
      printConcept('الأولى', malfunctionsTablesData);
    }
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
          onClick={() => handlePrint(option)}
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
            }
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
              mb: 0.5
            }}>
              <PrintIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />
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
