import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Warning as WarningIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const ConfirmationModal = ({ 
  open, 
  onClose, 
  onSave, 
  onCancel,
  title = "تغييرات غير محفوظة",
  message = "لديك تغييرات غير محفوظة. هل تريد حفظ التغييرات قبل المغادرة؟",
  changesData = null,
  showChangesPreview = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSave = () => {
    onSave();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const handleDiscard = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <WarningIcon sx={{ fontSize: 28 }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          sx={{
            my: 2,
            borderRadius: 2,
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
        >
          {message}
        </Alert>

        {showChangesPreview && changesData && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              معاينة التغييرات:
            </Typography>
            <Box
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'background.paper',
                maxHeight: 200,
                overflow: 'auto'
              }}
            >
              <pre style={{ margin: 0, fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(changesData, null, 2)}
              </pre>
            </Box>
          </Box>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: 'center', fontStyle: 'italic' }}
        >
          اختر أحد الخيارات أدناه للمتابعة
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          color='primary'
          sx={{
            borderRadius: 2,
            flex: { xs: 1, sm: 'none' },
            minWidth: { xs: '100%', sm: 120 },
            py: 1.5,
          }}
        >
          حفظ والمتابعة
        </Button>

        <Button
          onClick={handleDiscard}
          variant="contained"
          color='warning'
          sx={{
            borderRadius: 2,
            flex: { xs: 1, sm: 'none' },
            minWidth: { xs: '100%', sm: 120 },
            py: 1.5
          }}
        >
          تابع التعديلات
        </Button>

        <Button
          onClick={handleCancel}
          variant="contained"
          color='error'
          sx={{
            borderRadius: 2,
            flex: { xs: 1, sm: 'none' },
            minWidth: { xs: '100%', sm: 120 },
            py: 1.5,
          }}
        >
          إلغاء التعديلات
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
