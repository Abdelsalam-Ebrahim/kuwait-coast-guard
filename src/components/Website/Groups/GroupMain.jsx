import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SubNavbar from './SubNavbar';
import Audience from './System/Audience/Audience';
import Distribution from './System/Distribution/Distribution';
import Operations from './System/Operations/Operations';
import Outsiders from './System/Outsiders/Outsiders';
import Crews from './System/Crews/Crews';
import Archives from './System/Archives/Archives';
import Replacement from './System/Replacement/Replacement';
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
} from "../../../constants/DUMMY_DATA";

const GroupMain = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [employees, setEmployees] = useState({
    audience: audienceData,
    distribution: distributionData,
    operations: operationsData,
    outsiders: outsidersData,
    crews: crewsData,
    replacement: replacementData,
  });
  
  // Ref to store the navigation handler from child components
  const navigationHandlerRef = useRef(null);

  const handleTabChange = (tabId) => {
    // If there's a navigation handler (from a component with unsaved changes), use it
    if (navigationHandlerRef.current) {
      navigationHandlerRef.current(() => setActiveTab(tabId));
    } else {
      setActiveTab(tabId);
    }
  };

  const handleEmployeesChange = (type, updatedEmployees) => {
    setEmployees(prev => ({
      ...prev,
      [type]: updatedEmployees
    }));
  };

  const handleNavigationHandler = (handler) => {
    navigationHandlerRef.current = handler;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <Audience 
            employees={employees.audience} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('audience', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );
      
      case 'distribution':
        return (
          <Distribution 
            employees={employees.distribution} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('distribution', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'operations':
        return (
          <Operations 
            employees={employees.operations} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('operations', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'outsiders':
        return (
          <Outsiders 
            employees={employees.outsiders} 
            isShownInArchive={false}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('outsiders', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'crews':
        return <Crews employees={employees.crews} />;

      case 'archive':
        return <Archives employees={archiveData} />;

      case 'replacement':
        return (
          <Replacement 
            employees={employees.replacement || replacementData}
            onEmployeesChange={(updatedEmployees) => handleEmployeesChange('replacement', updatedEmployees)}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'weather':
        return <Weather />;
      
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
