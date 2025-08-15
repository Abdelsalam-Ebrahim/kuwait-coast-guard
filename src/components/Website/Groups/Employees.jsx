import {
  Box,
  Chip,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

const Employees = () => {
  const theme = useTheme();

  const employeeData = [
    {
      id: 1,
      title: 'ضباط',
      total: 25,
      present: 22,
      missing: 3,
      color: 'secondary'
    },
    {
      id: 2,
      title: 'نواخذة',
      total: 18,
      present: 16,
      missing: 2,
      color: 'info'
    },
    {
      id: 3,
      title: 'بحرية',
      total: 12,
      present: 11,
      missing: 1,
      color: 'success'
    },
    {
      id: 4,
      title: 'مدني فني',
      total: 8,
      present: 7,
      missing: 1,
      color: 'warning'
    },
    {
      id: 5,
      title: 'مهني فني',
      total: 6,
      present: 6,
      missing: 0,
      color: 'error'
    },
    {
      id: 6,
      title: 'مهني طباخ',
      total: 4,
      present: 4,
      missing: 0,
      color: 'secondary'
    },
    {
      id: 7,
      title: 'الجيس البنغالي فني',
      total: 10,
      present: 9,
      missing: 1,
      color: 'secondary'
    },
    {
      id: 8,
      title: 'الجيش البنغالي طباخ',
      total: 7,
      present: 6,
      missing: 1,
      color: 'info'
    }
  ];

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
        جاهزية السرية
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 2.4,
          pb: 4,
          '@media (max-width: 600px)': {
            gap: 2,
            pb: 3
          }
        }}
      >
        {employeeData.map((employee) => (
          <Paper
            key={employee.id}
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'transparent',
              borderColor: theme.palette.mode === 'dark' 
                ? `${theme.palette[employee.color].main}30` 
                : `${theme.palette[employee.color].light}50`,
              background: theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette[employee.color].main}08 100%)`
                : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette[employee.color].light}20 100%)`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? `0 8px 25px ${theme.palette[employee.color].main}30`
                  : `0 8px 25px ${theme.palette[employee.color].main}25`,
                borderColor: `${theme.palette[employee.color].main}80`
              }
            }}
          >
            {/* Icon and Title */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              mb: 1.75,
              gap: 1.5
            }}>
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                {employee.title}
              </Typography>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}>
                <Typography variant="body2" color="text.secondary">
                  إجمالي العدد:
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.info.main
                  }}
                >
                  {employee.total}
                </Typography>
              </Box>
            </Box>

            {/* Statistics */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Chip
                label={`حاضر: ${employee.present}`}
                size="small"
                sx={{
                  backgroundColor: theme.palette.success.main,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
              <Chip
                label={`الخوارج: ${employee.missing}`}
                size="small"
                sx={{
                  backgroundColor: employee.missing > 0 
                    ? theme.palette.error.main 
                    : theme.palette.grey[400],
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Employees;
