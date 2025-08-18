import { useState, useRef, useEffect } from 'react';
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

// Dummy data
import {
  audienceData,
  distributionData,
  operationsData,
  outsidersData,
  crewsData,
  archiveData,
  replacementData,
  technicalData,
} from "../../../constants/DUMMY_DATA";

const GroupMain = ({ squadData }) => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [employees, setEmployees] = useState(squadData);


  const handleEmployeesChange = (type, updatedEmployees) => {
    setEmployees(prev => ({
      ...prev,
      [type]: updatedEmployees
    }));
  };

  // Ref to store the navigation handler from child components
  const navigationHandlerRef = useRef(null);

  // Clear navigation handler when navigating to components that don't use unsaved changes
  useEffect(() => {
    const componentsWithoutUnsavedChanges = ['crews', 'archive', 'weather'];
    if (componentsWithoutUnsavedChanges.includes(activeTab)) {
      navigationHandlerRef.current = null;
    }
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    // If there's a navigation handler (from a component with unsaved changes), use it
    if (navigationHandlerRef.current) {
      navigationHandlerRef.current(() => {
        setActiveTab(tabId);
        // Clear the navigation handler after successful navigation
        navigationHandlerRef.current = null;
      });
    } else {
      setActiveTab(tabId);
    }
  };

  const handleNavigationHandler = (handler) => {
    navigationHandlerRef.current = handler;
  };

  // Clear navigation handler when component unmounts or changes
  const clearNavigationHandler = () => {
    navigationHandlerRef.current = null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <Attendance 
            employees={employees} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('attendance', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );
      
      case 'distribution':
        return (
          <Distribution 
            employees={employees} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('distribution', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'operations':
        return (
          <Operations 
            employees={employees} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('operations', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'outsiders':
        return (
          <Outsiders 
            employees={employees} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('outsiders', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'crews':
        return <Crews employees={employees} onNavigateAway={clearNavigationHandler} />;

      case 'archive':
        return <Archives employees={archiveData} onNavigateAway={clearNavigationHandler} />;

      case 'replacement':
        return (
          <Replacement 
            employees={employees.replacement || replacementData}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('replacement', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'technical':
        return (
          <Technical 
            employees={employees.technical || technicalData}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('technical', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'weather':
        return <Weather onNavigateAway={clearNavigationHandler} />;
      
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
      <SubNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      <Box sx={{ minHeight: '100vh' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default GroupMain;
