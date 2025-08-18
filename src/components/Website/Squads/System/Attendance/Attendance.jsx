import { useEffect } from 'react';
import { 
  Paper, 
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  useTheme,
} from '@mui/material';
import SystemHeader from '../../Ui/SystemHeader';
import ConfirmationModal from '../../Ui/ConfirmationModal';
import useUnsavedChanges from '../../shared/useUnsavedChanges';

import printAttendance from './PrintAttendance';
import CustomTableHead from '../../Ui/TableHead';

const Attendance = ({ employees, isShownInArchive, onEmployeesChange, onNavigateAway }) => {
  const theme = useTheme();

  const tableHeadContent = [
    { label: 'الحضور', style: { px: 2 } },
    { label: 'المسمى الوظيفي' },
    { label: 'الرتبة' },
    { label: 'الاسم الكامل' },
    { label: 'الفئة' }
  ];

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

  // Handle attendance change just on updated state not the original state
  const handleAttendanceChange = (index, checked) => {
    if (isShownInArchive) return;
    
    const updatedEmployees = [...currentEmployees];
    updatedEmployees[index] = {
      ...updatedEmployees[index],
      attendance: checked
    };
    updateData(updatedEmployees);
  };

  // Get changes data for preview on confirmation modal
  const getEmployeeChangesData = () => {
    return getChangesData((originalEmployees, currentEmployees) => {
      const changes = [];
      
      currentEmployees.forEach((employee, index) => {
        if (employee.attendance !== originalEmployees[index]?.attendance) {
          changes.push({ employeeName: employee.name });
        }
      });
      
      return changes;
    });
  };

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}>
        {!isShownInArchive && (
          <SystemHeader
            title="إدارة الحضور"
            isPrinting={true}
            isSaving={true}
            hasChanges={hasChanges}
            printFn={() => printAttendance('الاولي', employees)}
            saveFn={() => saveChanges(onEmployeesChange)}
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
          <Table sx={{ minWidth: 700 }}>
            <CustomTableHead columnsName={tableHeadContent} />

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
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 70, sm: 80 }
                    }}
                  >
                    <Checkbox 
                      disabled={isShownInArchive}
                      checked={employee.attendance}
                      onChange={(e) => handleAttendanceChange(index, e.target.checked)}
                      color="primary"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: { xs: '1.1rem', sm: '1.3rem' }
                        },
                      }}
                    />
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
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      fontWeight: 500,
                      color: 'primary.main',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 80, sm: 100 }
                    }}
                  >
                    {employee.rank}
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
                    {employee.name}
                  </TableCell>

                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 100, sm: 120 }
                    }}
                  >
                    <Typography 
                      variant="caption"
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        fontWeight: 600,
                      }}
                    >
                      {employee.categoryName}
                    </Typography>
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
        title="تغييرات غير محفوظة في الحضور"
        message="لديك تغييرات غير محفوظة في حضور الموظفين. هل تريد حفظ التغييرات قبل المغادرة؟"
        changesData={getEmployeeChangesData()}
        showChangesPreview={true}
      />
    </Box>
  );
};

export default Attendance;
