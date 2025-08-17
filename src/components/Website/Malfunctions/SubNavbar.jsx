import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Security as SecurityIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  Archive as ArchiveIcon,
  WbSunny as WeatherIcon,
  SwapHoriz as ReplaceIcon,
  Engineering as EngineeringIcon
} from '@mui/icons-material';

const SubNavbar = ({ activeTab, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const navItems = [
    { 
      id: 'canoes', 
      label: 'الزوراق', 
      icon: <PeopleIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> 
    },
    { 
      id: 'units', 
      label: 'الوحدات', 
      icon: <AssignmentIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> 
    },
    { 
      id: 'rabs', 
      label: 'الربس', 
      icon: <SecurityIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> 
    },
    { 
      id: 'tampa', 
      label: 'تامبه', 
      icon: <ExitToAppIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> 
    },
    { 
      id: 'concept', 
      label: 'كونسبت', 
      icon: <GroupsIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> 
    },
    { 
      id: 'magnum', 
      label: 'مجنم', 
      icon: <WeatherIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} /> 
    },
    { 
      id: 'archive', 
      label: 'الارشيف', 
      icon: <ArchiveIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
    },
  ];

  const handleTabChange = (event, newValue) => {
    const selectedItem = navItems[newValue];
    onTabChange(selectedItem.id);
  };

  const currentIndex = navItems.findIndex(item => item.id === activeTab);

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.paper 
          : theme.palette.background.default,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={currentIndex >= 0 ? currentIndex : 0}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          sx={{
            minHeight: { xs: 56, sm: 64 },
            '& .MuiTabs-flexContainer': {
              justifyContent: isMobile ? 'flex-start' : 'center'
            },
            '& .MuiTab-root': {
              minWidth: isMobile ? 80 : 120,
              minHeight: { xs: 56, sm: 64 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 500,
              color: theme.palette.text.secondary,
              textTransform: 'none',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 0.5 : 1,
              padding: { xs: '8px 12px', sm: '12px 16px' },
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.04)',
              },
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 600,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(144, 202, 249, 0.08)' 
                  : 'rgba(25, 118, 210, 0.08)',
              }
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
              backgroundColor: theme.palette.primary.main
            },
            '& .MuiTabs-scrollButtons': {
              color: theme.palette.text.secondary,
              '&.Mui-disabled': {
                opacity: 0.3
              }
            }
          }}
        >
          {navItems.map((item, index) => (
            <Tab
              key={item.id}
              icon={item.icon}
              label={item.label}
              iconPosition={isMobile ? "top" : "start"}
              disableRipple
            />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
};

export default SubNavbar;
