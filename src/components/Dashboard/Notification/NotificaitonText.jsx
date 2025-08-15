import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const NotificaitonText = ({ 
  selectedUsers, 
  notificationMessage, 
  onMessageChange, 
  onSendNotification, 
  isSending, 
  showComponent 
}) => {
  if (!showComponent) {
    return null;
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        mx: { xs: 2, sm: 3 }
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 600, 
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <SendIcon color="primary" />
        كتابة الإشعار
      </Typography>

      {selectedUsers.length > 0 && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontSize: { xs: '0.85rem', sm: '0.875rem' }
            }
          }}
        >
          تم اختيار {selectedUsers.length} مستخدم للإرسال
        </Alert>
      )}

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="اكتب نص الإشعار هنا..."
        value={notificationMessage}
        onChange={onMessageChange}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      />

      <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
        <Button
          variant="contained"
          size="large"
          onClick={onSendNotification}
          disabled={isSending || selectedUsers.length === 0 || !notificationMessage.trim()}
          startIcon={isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          sx={{
            minWidth: { xs: '100%', sm: 200 },
            borderRadius: 2,
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            py: 1.5
          }}
        >
          {isSending ? 'جاري الإرسال...' : 'إرسال الإشعار'}
        </Button>
      </Box>
    </Paper>
  );
};

export default NotificaitonText;
