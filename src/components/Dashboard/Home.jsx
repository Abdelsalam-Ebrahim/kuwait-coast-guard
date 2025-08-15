import React, { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  AccountBox as AccountBoxIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  ReportProblem as ReportProblemIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

// Import existing components
import CreateAccount from './Account/CreateAccount/CreateAccount';
import EditAccount from './Account/EditAccount/EditAccount';
import DeleteAccount from './Account/DeleteAccount/DeleteAccount';
import AddUser from './User/AddUser/AddUser';
import EditUser from './User/EditUser/EditUser';
import RemoveUser from './User/RemoveUser/RemoveUser';
import Notification from './Notification/Notification';
import ContactEmail from './Emails/ContactEmail';
import MalfunctionsEmail from './Emails/MalfunctionsEmails';

// Static dashboard items definition
const getDashboardItems = (theme) => [
  {
    id: 'create-account',
    title: 'إنشاء حساب',
    icon: AccountBoxIcon,
    component: CreateAccount,
    color: theme.palette.success.main,
  },
  {
    id: 'edit-account',
    title: 'تعديل حساب',
    icon: EditIcon,
    component: EditAccount,
    color: theme.palette.warning.main,
  },
  {
    id: 'delete-account',
    title: 'حذف حساب',
    icon: DeleteIcon,
    component: DeleteAccount,
    color: theme.palette.error.main,
  },
  {
    id: 'add-user',
    title: 'إضافة موظف',
    icon: PersonAddIcon,
    component: AddUser,
    color: theme.palette.primary.main,
  },
  {
    id: 'edit-user',
    title: 'تعديل موظف',
    icon: EditIcon,
    component: EditUser,
    color: theme.palette.warning.main,
  },
  {
    id: 'delete-user',
    title: 'حذف موظف',
    icon: PersonRemoveIcon,
    component: RemoveUser,
    color: theme.palette.error.main,
  },
  {
    id: 'send-notification',
    title: 'إرسال إشعار',
    icon: NotificationsIcon,
    component: Notification,
    color: theme.palette.info.main,
  },
  {
    id: 'contact-email',
    title: 'البريد الإلكتروني للتواصل',
    icon: EmailIcon,
    component: ContactEmail,
    color: theme.palette.info.main,
  },
  {
    id: 'malfunctions-email',
    title: 'البريد الإلكتروني للاعطال',
    icon: ReportProblemIcon,
    component: MalfunctionsEmail,
    color: theme.palette.info.main,
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedItemId, setSelectedItemId] = useState(null);

  const dashboardItems = useMemo(() => getDashboardItems(theme), [theme]);

  const selectedItem = useMemo(
    () => dashboardItems.find((item) => item.id === selectedItemId),
    [dashboardItems, selectedItemId]
  );

  const handleSelectItem = (itemId) => {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <Box py={4}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2
          }}
        >
          لوحة التحكم الإدارية
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
        >
          إدارة شاملة للنظام والمستخدمين
        </Typography>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {dashboardItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedItemId === item.id;
          return (
            <Grid item xs={6} sm={6} md={4} key={item.id} sx={{mx: { xs: 'auto', sm: 0 }}}>
              <Card
                sx={{
                  width: 200,
                  height: { xs: 140, sm: 180 },
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: 1,
                  borderColor: isActive ? item.color : 'divider',
                  borderRadius: 3,
                  backgroundColor: isActive ? `${item.color}08` : 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    borderColor: item.color,
                  },
                }}
                onClick={() => handleSelectItem(item.id)}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    p: { xs: 1.5, sm: 3 },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 50, sm: 70 },
                      height: { xs: 50, sm: 70 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${item.color}15`,
                      color: item.color,
                      mb: { xs: 1, sm: 2 },
                      border: 2,
                      borderColor: `${item.color}30`,
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: { xs: 24, sm: 32 } }} />
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: { xs: '0.85rem', sm: '1.1rem' },
                      lineHeight: 1.2,
                      textAlign: 'center',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Selected Component */}
      {selectedItem && (
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                borderBottom: 1,
                borderColor: 'divider',
                pb: 2
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {React.createElement(selectedItem.icon, { 
                  sx: { fontSize: { xs: 24, sm: 30 }, color: 'primary.main' } 
                })}
                {selectedItem.title}
              </Typography>
              
              <IconButton
                aria-label="Close section"
                onClick={() => setSelectedItemId(null)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'error.light',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ minHeight: 200 }}>
              {React.createElement(selectedItem.component)}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Home;
