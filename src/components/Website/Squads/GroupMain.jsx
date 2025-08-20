import { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SubNavbar from './Ui/SubNavbar';
import Attendance from './System/Attendance/Attendance';
import Distribution from './System/Distribution/Distribution';
import Operations from './System/Operations/Operations';
import Outsiders from './System/Outsiders/Outsiders';
import Crews from './System/Crews/Crews';
import Archives from './System/Archives/Archives';
import Replacement from './System/Replacement/Replacement';
import Technical from './System/Technical/Technical';
import Weather from './System/Weather/Weather';

// import react query
import { useMutation } from '@tanstack/react-query';
import { queryClient } from "../../../util/constants";
import { editEmployees } from "../../../util/employeeHttp";
import { useAuth } from '../../../store/AuthContext';
import toast from 'react-hot-toast';


const GroupMain = ({ employeesData }) => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('attendance');
  const [isPendingNav, setIsPendingNav] = useState();
  const [isNav, setIsNav] = useState(false);

  const { mutateAsync, isPending } = useMutation({ mutationFn: (updatedData) => editEmployees(updatedData, token) });

  async function handleUpdateAllEmployees(updatedData) {
    try {
      await mutateAsync(updatedData);
      await queryClient.invalidateQueries({ queryKey: ['allEmployees'] });
      toast.success('تم تعديل بيانات الموظفين بنجاح');
      
      return true;
    } catch (err) {
      toast.error('فشل تعديل بيانات الموظفين');
      return false;
    } finally {
      if(isPendingNav) {
        resetIsPendingNav(true);
      }
    }
  }
  
  function resetIsPendingNav(isReset) {
    if(isReset) {
      setActiveTab(isPendingNav);
      setIsPendingNav(null);
      setIsNav(false);
    } else {
      setIsNav(false);
      setIsPendingNav(null);
    }
  }

  function handleChangeActiveTab(newTab) {
    setIsNav(true);
    setIsPendingNav(newTab);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <Attendance
            employees={employeesData}
            isShownInArchive={false}
            onSave={handleUpdateAllEmployees}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
            isUpdating={isPending}
          />
        );
      
      case 'distribution':
        return (
          <Distribution
            isShownInArchive={false}
            onSave={handleUpdateAllEmployees}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
            isUpdating={isPending}
          />
        );

      case 'operations':
        return (
          <Operations
            isShownInArchive={false}
            onSave={handleUpdateAllEmployees}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
            isUpdating={isPending}
          />
        );

      case 'outsiders':
        return (
          <Outsiders
            employees={employeesData}
            isShownInArchive={false}
            onSave={handleUpdateAllEmployees}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
            isUpdating={isPending}
          />
        );

      case 'crews':
        return (
          <Crews
            employees={employeesData}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
          />
        );

      case 'archive':
        return (
          <Archives
            employees={employeesData}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
          />
        );

      case 'replacement':
        return (
          <Replacement
            employees={employeesData}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
            // onUpdateEmployees={handleEmployeesChange}
            // ensureSaveChanges={() => setShowModal(true)}
          />
        );

      case 'technical':
        return (
          <Technical
            employees={employeesData}
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
            // onUpdateEmployees={handleEmployeesChange}
            // ensureSaveChanges={() => setShowModal(true)}
          />
        );

      case 'weather':
        return (
          <Weather
            isNav={isNav}
            onNavFreely={resetIsPendingNav}
          />
        );

      default:
        return (
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                مرحباً
              </Typography>
              <Typography variant="body1">
                يرجى اختيار أحد الأقسام من القائمة أعلاه.
              </Typography>
            </Paper>
          </Container>
        );
      }
  };

  return (
    <Box>
      <SubNavbar activeTab={activeTab} onTabChange={handleChangeActiveTab} />
      <Box sx={{ minHeight: '100vh' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default GroupMain;
