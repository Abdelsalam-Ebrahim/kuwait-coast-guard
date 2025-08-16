import {
  Box,
  Chip,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

const EmployeeCard = ({ employee }) => {
  const theme = useTheme();

  return (
    <Paper
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
          ? `${theme.palette.info.main}30` 
          : `${theme.palette.info.light}50`,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.info.main}08 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.info.light}20 100%)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? `0 8px 25px ${theme.palette.info.main}30`
            : `0 8px 25px ${theme.palette.info.main}25`,
          borderColor: `${theme.palette.info.main}80`
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
  );
};

export default EmployeeCard;
