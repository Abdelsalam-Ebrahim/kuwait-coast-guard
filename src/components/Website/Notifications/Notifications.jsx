import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  Badge
} from '@mui/material';
import {
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import Notification from './Notification';

const Notifications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simplified notifications data - only message, date, time, and read status
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'تذكير بموعد دورة الإسعافات الأولية المقررة يوم الأحد القادم في تمام الساعة 8:00 صباحاً. يرجى الحضور في الموعد المحدد.',
      date: '2024-01-15',
      time: '10:30',
      isRead: false
    },
    {
      id: 2,
      message: 'تم تحديث لوائح الأمن والسلامة الداخلية. يرجى من جميع المنتسبين مراجعة اللوائح الجديدة والالتزام بها اعتباراً من تاريخ اليوم.',
      date: '2024-01-14',
      time: '14:15',
      isRead: false
    },
    {
      id: 3,
      message: 'تم الموافقة على طلب الإجازة المقدم بتاريخ 2024-01-10. تبدأ الإجازة من تاريخ 2024-01-20 ولمدة أسبوع واحد.',
      date: '2024-01-13',
      time: '09:45',
      isRead: true
    },
    {
      id: 4,
      message: 'يوجد عطل مؤقت في نظام الحضور والانصراف. يرجى تسجيل الحضور يدوياً حتى يتم إصلاح العطل. نعتذر عن الإزعاج.',
      date: '2024-01-12',
      time: '11:20',
      isRead: true
    },
    {
      id: 5,
      message: 'يُعقد الاجتماع الشهري لجميع الضباط يوم الخميس القادم في قاعة الاجتماعات الرئيسية في تمام الساعة 2:00 ظهراً.',
      date: '2024-01-11',
      time: '16:30',
      isRead: true
    },
    {
      id: 6,
      message: 'فشلت عملية النسخ الاحتياطي للبيانات ليلة أمس. تم إعادة تشغيل العملية وتمت بنجاح. جميع البيانات آمنة.',
      date: '2024-01-10',
      time: '08:15',
      isRead: true
    }
  ]);

  // Function to mark notification as read
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper 
        elevation={2} 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: { xs: 2, sm: 3 }, 
          mb: 4, 
          borderRadius: 2,
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
          </Badge>
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600 }}>
            الإشعارات
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {notifications.length} إشعارات - {unreadCount} غير مقروء
        </Typography>
      </Paper>

      {/* Notifications List */}
      <Grid container spacing={2}>
        {notifications.map((notification) => (
          <Grid item xs={12} key={notification.id} width="100%">
            <Notification 
              notification={notification} 
              onMarkAsRead={handleMarkAsRead}
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            لا توجد إشعارات
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            سيتم عرض الإشعارات الجديدة هنا عند وصولها
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Notifications;
