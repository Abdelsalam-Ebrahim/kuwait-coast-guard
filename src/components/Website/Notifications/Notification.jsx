import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme
} from '@mui/material';
import {
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const Notification = ({ notification, onMarkAsRead }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: notification.isRead ? 'divider' : 'primary.main',
        backgroundColor: notification.isRead 
          ? theme.palette.background.paper 
          : theme.palette.mode === 'dark' 
            ? `${theme.palette.primary.main}08`
            : `${theme.palette.primary.main}04`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          {/* Read/Unread Indicator */}
          <Box sx={{ mt: 1, minWidth: 'auto' }}>
            {!notification.isRead && (
              <CircleIcon 
                sx={{ 
                  fontSize: 12, 
                  color: 'primary.main'
                }} 
              />
            )}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Message */}
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                lineHeight: 1.6,
                mb: 2,
                fontWeight: notification.isRead ? 400 : 500
              }}
            >
              {notification.message}
            </Typography>

            {/* Footer with Date and Status */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              pt: 1,
              borderTop: 1,
              borderColor: 'divider'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {notification.date} • {notification.time}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: notification.isRead ? 'text.secondary' : 'primary.main',
                    fontWeight: notification.isRead ? 400 : 600,
                    fontSize: '0.75rem'
                  }}
                >
                  {notification.isRead ? 'مقروء' : 'غير مقروء'}
                </Typography>
                
                {!notification.isRead && onMarkAsRead && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => onMarkAsRead(notification.id)}
                    sx={{
                      fontSize: '0.7rem',
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      minWidth: 'auto',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText'
                      }
                    }}
                  >
                    تحديد كمقروء
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Notification;
