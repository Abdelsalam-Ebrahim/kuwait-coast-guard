import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';

const DistributionTable = ({ people }) => {
  const theme = useTheme();

  return (
    <TableContainer 
      component={Paper} 
      elevation={0} 
      sx={{ 
        border: 1, 
        borderColor: 'divider',
        borderRadius: { xs: 2, sm: 3 },
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        overflowX: 'auto',
        width: '100%',
        '&::-webkit-scrollbar': {
          height: { xs: 6, sm: 8 },
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 4,
        },
      }}
    >
      <Table sx={{ minWidth: { xs: 300, sm: 350, lg: 450 }, width: '100%' }}>
        <TableHead>
          <TableRow 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '& .MuiTableCell-head': {
                borderBottom: 'none'
              }
            }}
          >
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                py: { xs: 0.7, sm: 1, md: 1.2, lg: 1 },
                px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                letterSpacing: '0.5px',
                minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
                width: '40%'
              }}
            >
              الرتبة
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                py: { xs: 0.7, sm: 1, md: 1.2, lg: 1 },
                px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                letterSpacing: '0.5px',
                minWidth: { xs: 70, sm: 90, md: 100, lg: 90 },
                width: '25%'
              }}
            >
              المسمى
            </TableCell>
            <TableCell 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                py: { xs: 0.7, sm: 1, md: 1.2, lg: 1 },
                px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                letterSpacing: '0.5px',
                minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
                width: '35%'
              }}
            >
              الاسم 
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {people.map((employee, index) => (
            <TableRow 
              sx={{
                backgroundColor: index % 2 === 0 
                  ? theme.palette.mode === 'light' 
                    ? 'rgba(0, 0, 0, 0.02)' 
                    : 'rgba(255, 255, 255, 0.05)'
                  : theme.palette.mode === 'light'
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                },
                '&:last-child td': {
                  borderBottom: 'none'
                }
              }}
            >
              <TableCell 
                sx={{ 
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.8rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                  py: { xs: 0.5, sm: 0.6, md: 0.8, lg: 0.6 },
                  px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                  borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                  minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
                  width: '40%',
                  wordBreak: 'break-word'
                }}
              >
                {employee.rank}
              </TableCell>

              <TableCell 
                sx={{ 
                  fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem', lg: '0.75rem' },
                  fontWeight: 500,
                  color: 'primary.main',
                  py: { xs: 0.5, sm: 0.6, md: 0.8, lg: 0.6 },
                  px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                  borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                  minWidth: { xs: 70, sm: 90, md: 100, lg: 90 },
                  width: '25%',
                }}
              >
                {employee.jobTitle}
              </TableCell>

              <TableCell 
                sx={{ 
                  py: { xs: 0.5, sm: 0.6, md: 0.8, lg: 0.6 },
                  px: { xs: 0.5, sm: 0.7, md: 0.8, lg: 0.7 },
                  borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                  minWidth: { xs: 100, sm: 120, md: 140, lg: 130 },
                  width: '35%'
                }}
              >
                <Typography 
                  variant="body2"
                  sx={{ 
                    fontSize: { xs: '0.65rem', sm: '0.72rem', md: '0.75rem', lg: '0.72rem' },
                    fontWeight: 600,
                    color: 'text.secondary',
                    wordBreak: 'break-word'
                  }}
                >
                  {employee.name}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistributionTable;
