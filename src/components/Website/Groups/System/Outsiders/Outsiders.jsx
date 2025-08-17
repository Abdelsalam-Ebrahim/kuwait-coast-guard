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
  Checkbox,
  TextField,
  Typography
} from '@mui/material';
import SystemHeader from '../SystemHeader';
import ConfirmationModal from '../ConfirmationModal';
import useUnsavedChanges from '../../../../../hooks/useUnsavedChanges';
import printOutsiders from './PrintOutsiders';

const Outsiders = ({ employees, isShownInArchive, onEmployeesChange, onNavigateAway }) => {
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
  }, [exposeNavigationHandler, onNavigateAway]);

  // Handle reason change
  const handleReasonChange = (index, newValue) => {
    if (isShownInArchive) return;
    
    const updatedEmployees = [...currentEmployees];
    updatedEmployees[index] = {
      ...updatedEmployees[index],
      reason: newValue
    };
    updateData(updatedEmployees);
  };

  // Handle date checkbox change
  const handleDateCheckboxChange = (index, checked) => {
    if (isShownInArchive) return;
    
    const updatedEmployees = [...currentEmployees];
    updatedEmployees[index] = {
      ...updatedEmployees[index],
      hasDate: checked,
      dateFrom: checked ? updatedEmployees[index].dateFrom : "",
      dateTo: checked ? updatedEmployees[index].dateTo : ""
    };
    updateData(updatedEmployees);
  };

  // Handle date change
  const handleDateChange = (index, field, value) => {
    if (isShownInArchive) return;
    
    const updatedEmployees = [...currentEmployees];
    updatedEmployees[index] = {
      ...updatedEmployees[index],
      [field]: value
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
        const original = originalEmployees[index];
        if (employee.reason !== original?.reason ||
            employee.hasDate !== original?.hasDate ||
            employee.dateFrom !== original?.dateFrom ||
            employee.dateTo !== original?.dateTo) {
          changes.push({
            employeeName: employee.fullName,
            oldReason: original?.reason,
            newReason: employee.reason,
            oldDates: original?.hasDate ? `${original?.dateFrom} - ${original?.dateTo}` : 'غير مطلوب',
            newDates: employee.hasDate ? `${employee.dateFrom} - ${employee.dateTo}` : 'غير مطلوب'
          });
        }
      });
      
      return changes;
    });
  };

  const reasonOptions = [
    "رخصة",
    "سنوية",
    "إدارية",
    "غياب",
    "مرضية",
    "المحاكمات العسكرية",
    "انتقل",
    "اشعار غياب",
    "حالة وفاة",
    "كف يد",
    "دورة تدريبية",
    "هروب",
    "مرافق مريض",
    "تفرغ رياضي",
    "علاج بالخارج",
  ];

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}> 
        {!isShownInArchive && (
          <SystemHeader
            title={"إدارة الغائبين"}
            isPrinting={true}
            isSaving={true}
            hasChanges={hasChanges}
            printFn={() => printOutsiders('الاولي', employees)}
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
          <Table sx={{ minWidth: 800 }}>
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
                  المسمى
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
                  الاسم
                </TableCell>

                <TableCell 
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.95rem' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1 },
                    letterSpacing: '0.5px',
                    minWidth: { xs: 120, sm: 140 }
                  }}
                >
                  السبب
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
                    minWidth: { xs: 60, sm: 80 }
                  }}
                >
                  التاريخ
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
                    minWidth: { xs: 200, sm: 250 }
                  }}
                >
                  من - إلى
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
                      minWidth: { xs: 120, sm: 140 }
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: { xs: 110, sm: 140 } }}>
                      <Select
                        disabled={isShownInArchive}
                        value={employee.reason}
                        onChange={(e) => handleReasonChange(index, e.target.value)}
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
                          }
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
                          اختر السبب
                        </MenuItem>
                        {reasonOptions.map((option) => (
                          <MenuItem key={option} value={option} sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      textAlign: 'center',
                      minWidth: { xs: 60, sm: 80 }
                    }}
                  >
                    <Checkbox
                      checked={employee.hasDate}
                      disabled={employee.reason === null || employee.reason === '' || isShownInArchive}
                      onChange={(e) => handleDateCheckboxChange(index, e.target.checked)}
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      textAlign: 'center',
                      minWidth: { xs: 200, sm: 250 }
                    }}
                  >
                    {employee.hasDate ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                          disabled={isShownInArchive}
                          type="date"
                          size="small"
                          value={employee.dateFrom}
                          onChange={(e) => handleDateChange(index, 'dateFrom', e.target.value)}
                          sx={{
                            minWidth: { xs: 120, sm: 140 },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.75rem', sm: '0.85rem' },
                              padding: { xs: '6px 8px', sm: '8px 12px' }
                            }
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                          إلى
                        </Typography>
                        
                        <TextField
                          disabled={isShownInArchive}
                          type="date"
                          size="small"
                          value={employee.dateTo}
                          onChange={(e) => handleDateChange(index, 'dateTo', e.target.value)}
                          sx={{
                            minWidth: { xs: 120, sm: 140 },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.75rem', sm: '0.85rem' },
                              padding: { xs: '6px 8px', sm: '8px 12px' }
                            }
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        غير مطلوب
                      </Typography>
                    )}
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
        title="تغييرات غير محفوظة في الغائبين"
        message="لديك تغييرات غير محفوظة في بيانات الموظفين الغائبين. هل تريد حفظ التغييرات قبل المغادرة؟"
        changesData={getEmployeeChangesData()}
        showChangesPreview={true}
      />
    </Box>
  );
};

export default Outsiders;
