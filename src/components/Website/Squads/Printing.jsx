import { Box, Paper, Stack, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import printAttendance from './System/Attendance/PrintAttendance';
import printDistributionContent from './System/Distribution/PrintDistribution';
import printOperationsContent from './System/Operations/PrintOperations';
import printCrewsContent from './System/Crews/PrintCrews';
import printOutsidersContent from './System/Outsiders/PrintOutsiders';
import toast from 'react-hot-toast';
import printArchives from './System/Archives/PrintArchives';


const Printing = ({ squadData }) => {
  // console.log("squadData", squadData);

  const printingOptions = [
    { id: 'audience', title: 'طباعة الحضور', enabled: true },
    { id: 'distribution', title: 'طباعة التوزيع', enabled: true },
    { id: 'operations', title: 'طباعة العمليات', enabled: true },
    { id: 'outsiders', title: 'طباعة الخوارج', enabled: true },
    { id: 'crews', title: 'طباعة الارشيف', enabled: true },
  ];


  const handlePrint = (option) => {
    if (!option.enabled) return;

    if(!squadData.length) {
      toast.error('لا يوجد بيانات للطباعة');
      return;
    }
    
    if (option.id === 'audience') {
      printAttendance(squadData);
    } else if (option.id === 'distribution') {
      printDistributionContent(squadData);
    } else if (option.id === 'operations') {
      printOperationsContent(squadData);
    } else if (option.id === 'outsiders') {
      printOutsidersContent(squadData);
    } else if (option.id === 'crews') {
      printArchives(squadData);
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
