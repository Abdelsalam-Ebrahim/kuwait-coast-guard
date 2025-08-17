import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SubNavbar from './SubNavbar';

// importing components
import Canoes from './System/Canoes/Canoes';
import Units from './System/Units/Units';
import Rabs from './System/Rabs/Rabs';
import Tampa from './System/Tampa/Tampa';
import Concept from './System/Concept/Concept';
import Magnum from './System/Magnum/Magnum';
import Archives from './System/Archives/Archives';

// Dummy data
import { malfunctionsTablesData } from "../../../constants/DUMMY_DATA";


const GroupMain = () => {
  const [activeTab, setActiveTab] = useState('canoes');
  const [malfunctions, setMalfunctions] = useState(malfunctionsTablesData);

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

  const handleNavigationHandler = (handler) => {
    navigationHandlerRef.current = handler;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'canoes':
        return (
          <Canoes
            malfunctions={malfunctions}
            isShownInArchive={false}
            onMalfunctionsChange={setMalfunctions}
            onNavigateAway={handleNavigationHandler}
          />
        );
      
      case 'units':
        return (
          <Units
            malfunctions={malfunctions}
            isShownInArchive={false}
            onMalfunctionsChange={setMalfunctions}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'rabs':
        return (
          <Rabs
            malfunctions={malfunctions}
            isShownInArchive={false}
            onMalfunctionsChange={setMalfunctions}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'tampa':
        return (
          <Tampa
            malfunctions={malfunctions}
            isShownInArchive={false}
            onMalfunctionsChange={setMalfunctions}
            onNavigateAway={handleNavigationHandler}
          />
        );

      case 'concept':
        return (
          <Concept
            malfunctions={malfunctions}
            onMalfunctionsChange={setMalfunctions}
            onNavigateAway={handleNavigationHandler}
          />
        );
      
      case 'magnum':
        return (
          <Magnum
            malfunctions={malfunctions}
            onMalfunctionsChange={setMalfunctions}
            onNavigateAway={handleNavigationHandler}
          />
        );
      
      case 'archive':
        return <Archives malfunctions={malfunctions} />;

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
