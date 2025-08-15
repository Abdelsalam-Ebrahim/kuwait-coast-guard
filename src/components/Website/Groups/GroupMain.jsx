import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SubNavbar from './SubNavbar';
import Audience from './System/Audience';
import Distribution from './System/Distribution';
import Operations from './System/Operations';
import Outsiders from './System/Outsiders';
import Crews from './System/Crews';
import Archives from './System/Archives';
import Replace from './System/Replacement';
import Weather from './System/Weather';

const GroupMain = () => {
  const [activeTab, setActiveTab] = useState('attendance');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <Audience />;
      
      case 'distribution':
        return <Distribution />;
      
      case 'operations':
        return <Operations />;
      
      case 'outsiders':
        return <Outsiders />;
      
      case 'crews':
        return <Crews />;
      
      case 'archive':
        return <Archives />;
      
      case 'replacement':
        return <Replace />;
      
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
