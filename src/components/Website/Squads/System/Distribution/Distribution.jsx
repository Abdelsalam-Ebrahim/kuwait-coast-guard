import React, { useState, useEffect, useRef } from 'react';
import { 
  Paper, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from '@mui/material';
import SystemHeader from '../SystemHeader';
import ConfirmationModal from '../ConfirmationModal';
import useUnsavedChanges from '../../../../../hooks/useUnsavedChanges';
import printDistribution from './PrintDistribution';

const Distribution = ({ employees, isShownInArchive, onEmployeesChange, onNavigateAway }) => {
  const theme = useTheme();
  
  const {
    currentData: currentEmployees,
    hasChanges,
    showConfirmationModal,
    updateData,
    saveChanges,
    handleNavigationAttempt,
    handleConfirmSave,
    handleConfirmDiscard,
    handleConfirmCancel,
    getChangesData,
    exposeNavigationHandler
  } = useUnsavedChanges(employees);

  // Expose navigation check to parent component
  useEffect(() => {
    exposeNavigationHandler(onNavigateAway);
    
    // Cleanup function to clear navigation handler when component unmounts
    return () => {
      if (onNavigateAway) {
        onNavigateAway(null);
      }
    };
  }, [exposeNavigationHandler, onNavigateAway]);

  // Handle distribution change
  const handleDistributionChange = (index, newValue) => {
    if (isShownInArchive) return;
    
    const updatedEmployees = [...currentEmployees];
    updatedEmployees[index] = {
      ...updatedEmployees[index],
      distribution: newValue
    };
    updateData(updatedEmployees);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    saveChanges(onEmployeesChange);
  };

  // Get changes data for preview
  const getEmployeeChangesData = () => {
    return getChangesData((originalEmployees, currentEmployees) => {
      const changes = [];
      
      currentEmployees.forEach((employee, index) => {
        if (employee.distribution !== originalEmployees[index]?.distribution) {
          changes.push({
            employeeName: employee.fullName,
            oldDistribution: originalEmployees[index]?.distribution,
            newDistribution: employee.distribution
          });
        }
      });
      
      return changes;
    });
  };

  const distributionOptions = [
    "الادارة",
    "محجوز",
    "10",
    "20",
    "30",
    "40",
    "301",
    "302",
    "303",
    "304",
    "305",
    "306",
    "307",
    "308",
    "309",
    "310",
    "311",
    "312",
    "313",
    "314",
    "315",
    "316",
    "103",
    "107",
    "111",
    "112",
    "113",
    "116",
    "117",
    "118",
    "119",
    "120",
    "123",
    "124",
    "125",
    "126",
    "128",
    "R01",
    "R02",
    "R03",
    "R04",
    "R05",
    "R06",
    "R07",
    "R08",
    "R09",
    "R10",
    "R11",
    "R12",
    "R30",
    "R31",
    "R32",
    "R33",
    "R34",
    "R35",
    "R36",
    "R37",
    "R38",
    "R39",
    "R40",
    "R41",
    "R42",
    "701",
    "702",
    "703",
    "704",
    "705",
    "706",
    "707",
    "710",
    "711",
    "712",
    "713",
    "714",
    "715",
  ];

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}>
        {!isShownInArchive && (
          <SystemHeader
            title="إدارة التوزيع"
            isPrinting={true}
            isSaving={true}
            hasChanges={hasChanges}
            printFn={() => printDistribution('الاولي', currentEmployees)}
            saveFn={handleSaveChanges}
            onNavigationAttempt={handleNavigationAttempt}
          />
        )}

        <TableContainer 
          component={Paper} 
          elevation={0} 
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
            },
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow 
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '& .MuiTableCell-head': {
                    borderBottom: 'none'
                  }
                }}
              >
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 2, sm: 3 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 80, sm: 100 }
                  }}
                >
                  الرتبة
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 100, sm: 120 }
                  }}
                >
                  المسمى الوظيفي
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 150, sm: 180 }
                  }}
                >
                  الاسم الكامل
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    minWidth: { xs: 120, sm: 140 }
                  }}
                >
                  التوزيع
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEmployees.map((employee, index) => (
                <TableRow 
                  key={index} 
                  sx={{
                    backgroundColor: index % 2 === 0 
                      ? theme.palette.mode === 'light' 
                        ? 'rgba(0, 0, 0, 0.02)' 
                        : 'rgba(255, 255, 255, 0.05)'
                      : theme.palette.mode === 'light'
                        ? 'white'
                        : 'rgba(255, 255, 255, 0.02)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    },
                    '&:last-child td': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      fontWeight: 500,
                      color: 'primary.main',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 2, sm: 3 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 80, sm: 100 }
                    }}
                  >
                    {employee.rank}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      color: 'text.secondary',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 100, sm: 120 }
                    }}
                  >
                    {employee.jobTitle}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.95rem' },
                      fontWeight: 600,
                      color: 'text.primary',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 150, sm: 180 }
                    }}
                  >
                    {employee.fullName}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      textAlign: 'center',
                      minWidth: { xs: 120, sm: 140 }
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: { xs: 110, sm: 140 } }}>
                      <Select
                        disabled={isShownInArchive}
                        value={employee.distribution === 'اختر التوزيع' ? '' : employee.distribution || ''}
                        onChange={(e) => handleDistributionChange(index, e.target.value)}
                        displayEmpty
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main'
                          },
                        }}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 400 }}}}
                        renderValue={(selected) => {
                          if (!selected || selected === '') {
                            return <span style={{ color: '#9e9e9e' }}>اختر التوزيع</span>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem value="" disabled sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: 'text.secondary' }}>
                          اختر التوزيع
                        </MenuItem>
                        {distributionOptions.map((option) => (
                          <MenuItem key={option} value={option} sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ConfirmationModal
        open={showConfirmationModal}
        onClose={handleConfirmCancel}
        onSave={() => handleConfirmSave(onEmployeesChange)}
        onCancel={handleConfirmDiscard}
        title="تغييرات غير محفوظة في التوزيع"
        message="لديك تغييرات غير محفوظة في توزيع الموظفين. هل تريد حفظ التغييرات قبل المغادرة؟"
        changesData={getEmployeeChangesData()}
        showChangesPreview={true}
      />
    </Box>
  );
};

export default Distribution;
