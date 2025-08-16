import { Box, Button, Typography, Chip } from '@mui/material';
import { Save as SaveIcon, Print as PrintIcon, Circle as CircleIcon } from '@mui/icons-material';

const SystemHeader = ({ 
  title, 
  isPrinting, 
  isSaving, 
  printFn, 
  saveFn, 
  hasChanges = false,
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, 
        mb: 3,
        gap: { xs: 2, sm: 1 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography 
          variant="h4"
          component="h1"
          sx={{ 
            fontWeight: 600,
            textAlign: { xs: 'center', sm: 'right' }
          }}
        >
          {title}
        </Typography>
        
        {hasChanges && (
          <Chip
            icon={<CircleIcon sx={{ fontSize: '0.75rem !important' }} />}
            label="تغييرات غير محفوظة"
            color="warning"
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              fontSize: '0.75rem',
              height: 28,
              '& .MuiChip-icon': {
                animation: 'pulse 2s infinite'
              },
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.5 },
                '100%': { opacity: 1 }
              }
            }}
          />
        )}
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          width: { xs: '100%', sm: 'auto' }
        }}
      >
        {isSaving && (
          <Button
            onClick={saveFn}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!hasChanges}
            color="primary"
            sx={{ 
              borderRadius: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              py: { xs: 1, sm: 1.5 },
              '&:disabled': {
                opacity: 0.6
              },
            }}
          >
            حفظ التغييرات
          </Button>
        )}
        
        {isPrinting && (
          <Button
            onClick={printFn}
            variant="outlined"
            startIcon={<PrintIcon />}
            sx={{ 
              borderRadius: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              py: { xs: 1, sm: 1.5 }
            }}
          >
            طباعة التقرير
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default SystemHeader;
