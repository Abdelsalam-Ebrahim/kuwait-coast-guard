import { useState, useMemo } from 'react';
import {
  Grid,
  Card,
  Box,
  useTheme,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  AccountBox as AccountBoxIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  ReportProblem as ReportProblemIcon,
  School as SchoolIcon,
  MenuBook as CourseIcon,
} from '@mui/icons-material';

// Import existing components
import CreateAccount from '../Account/CreateAccount/CreateAccount';
import EditAccount from '../Account/EditAccount/EditAccount';
import DeleteAccount from '../Account/DeleteAccount/DeleteAccount';
import AddUser from '../User/AddUser';
import EditUser from '../User/EditUser';
import RemoveUser from '../User/RemoveUser';
import Notification from '../Notification/Notification';
import CreateCourse from "../Courses/CreateCourse/CreateCourse";
import EditCourse from "../Courses/EditCourse/EditCourse";
import DeleteCourse from '../Courses/DeleteCourse/DeleteCourse';
import ContactEmails from '../Emails/ContactEmails';
import MalfunctionsEmails from '../Emails/MalfunctionsEmails';
import CoursesEmails from '../Emails/CoursesEmails';
import HomeHeader from './HomeHeader';
import DashboardCard from './DashboardCard';
import SelectedCard from './SelectedCard';

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
    color: '#9c27b0', // Purple for notifications
  },
  {
    id: 'create-course',
    title: 'إنشاء دورة',
    icon: SchoolIcon,
    component: CreateCourse,
    color: '#4caf50', // Green for creating courses
  },
  {
    id: 'edit-course',
    title: 'تعديل دورة',
    icon: CourseIcon,
    component: EditCourse,
    color: '#ff9800', // Orange for editing courses
  },
  {
    id: 'delete-course',
    title: 'حذف دورة',
    icon: DeleteIcon,
    component: DeleteCourse,
    color: '#f44336', // Red for deleting courses
  },
  {
    id: 'contact-email',
    title: 'البريد الإلكتروني للتواصل',
    icon: EmailIcon,
    component: ContactEmails,
    color: '#2196f3', // Blue for email communication
  },
  {
    id: 'malfunctions-email',
    title: 'البريد الإلكتروني للاعطال',
    icon: ReportProblemIcon,
    component: MalfunctionsEmails,
    color: '#ff9800', // Orange for problems/malfunctions
  },
  {
    id: 'courses-email',
    title: 'البريد الإلكتروني للدورات',
    icon: EmailIcon,
    component: CoursesEmails,
    color: '#8bc34a', // Light green for courses email
  },
];

const Home = () => {
  const theme = useTheme();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const dashboardItems = useMemo(() => getDashboardItems(theme), [theme]);
  const selectedItem = useMemo(() => dashboardItems.find((item) => item.id === selectedItemId), [dashboardItems, selectedItemId]);

  const handleSelectItem = (itemId) => {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <Box py={4}>
      {/* Header */}
      <HomeHeader />

      {/* Dashboard Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {dashboardItems.map((item) => {
          const isActive = selectedItemId === item.id;
          return <DashboardCard key={item.id} isActive={isActive} item={item} handleSelectItem={handleSelectItem} />;
        })}
      </Grid>

      {/* Selected Component */}
      {selectedItem && <SelectedCard selectedItem={selectedItem} setSelectedItemId={setSelectedItemId} />}
    </Box>
  );
};

export default Home;
