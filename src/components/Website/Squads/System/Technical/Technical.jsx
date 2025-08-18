import { 
  Paper, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import SystemHeader from '../../Ui/SystemHeader';
import ConfirmationModal from '../../Ui/ConfirmationModal';
import useUnsavedChanges from '../../shared/useUnsavedChanges';
import printTechnical from './printTechnical';

const Technical = ({ employees: initialEmployees, onEmployeesChange, onNavigateAway }) => {
  // Complex data structure for this component (employees + dates)
  const initialData = {
    employees: initialEmployees || [],
    dates: ['2025-08-10', '2025-08-12', '2025-08-14', '2025-08-16']
  };

  const {
    currentData,
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
  } = useUnsavedChanges(initialData);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editingHead, setEditingHead] = useState(false);
  const [headFormData, setHeadFormData] = useState({});

  const reasonColumns = ['خوارج', 'حضور', 'توزيع', 'عمليات'];

  // Extract current employees and dates from currentData
  const employees = currentData?.employees || [];
  const dates = currentData?.dates || ['2025-08-10', '2025-08-12', '2025-08-14', '2025-08-16'];

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

  // Handle save changes
  const handleSaveChanges = () => {
    saveChanges((data) => {
      if (onEmployeesChange) {
        onEmployeesChange(data.employees);
      }
    });
  };

  // Update employees in the complex data structure
  const updateEmployees = (newEmployees) => {
    updateData({
      ...currentData,
      employees: newEmployees
    });
  };

  // Update dates in the complex data structure
  const updateDates = (newDates) => {
    updateData({
      ...currentData,
      dates: newDates
    });
  };

  // Get changes data for preview
  const getTechnicalChangesData = () => {
    return getChangesData((originalData, currentData) => {
      const changes = [];
      
      // Check employee changes
      currentData.employees.forEach((employee, index) => {
        const original = originalData.employees[index];
        if (JSON.stringify(employee.reason) !== JSON.stringify(original?.reason)) {
          changes.push({
            type: 'employee',
            employeeName: employee.fullName,
            oldReason: original?.reason || [],
            newReason: employee.reason || []
          });
        }
      });
      
      // Check date changes
      currentData.dates.forEach((date, index) => {
        if (date !== originalData.dates[index]) {
          changes.push({
            type: 'date',
            column: `التاريخ ${index + 1}`,
            oldDate: originalData.dates[index],
            newDate: date
          });
        }
      });
      
      return changes;
    });
  };

  // ---------------- Table Body Handlers ----------------
  const handleEditClick = (employee, index) => {
    const reasonData = {};
    reasonColumns.forEach(col => {
      reasonData[col] = employee.reason && Array.isArray(employee.reason) 
        ? employee.reason.includes(col) ? col : ''
        : '';
    });
    
    setEditFormData(reasonData);
    setEditingEmployee(index);
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyClick = (index) => {
    const updatedReasons = reasonColumns.filter(col => editFormData[col] && editFormData[col] !== '');
    
    const newEmployees = employees.map((emp, i) => 
      i === index ? { ...emp, reason: updatedReasons } : emp
    );
    updateEmployees(newEmployees);
    
    setEditingEmployee(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
    setEditFormData({});
  };

  // ---------------- Table Head Handlers ----------------
  const handleEditHeadClick = () => {
    const data = {};
    dates.forEach((d, i) => {
      data[i] = d;
    });
    setHeadFormData(data);
    setEditingHead(true);
  };

  const handleHeadInputChange = (index, value) => {
    setHeadFormData(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleApplyHeadClick = () => {
    const newDates = Object.values(headFormData);
    updateDates(newDates);
    setEditingHead(false);
    setHeadFormData({});
  };

  const handleCancelHeadEdit = () => {
    setEditingHead(false);
    setHeadFormData({});
  };

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
        <SystemHeader
          title={"إدارة الفنية"}
          isPrinting={true}
          isSaving={true}
          hasChanges={hasChanges}
          printFn={() => printTechnical('الاولي', employees, dates)}
          saveFn={handleSaveChanges}
          onNavigationAttempt={handleNavigationAttempt}
        />

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
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            {/* ---------------- Editable Table Head ---------------- */}
            <TableHead>
              <TableRow 
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '& .MuiTableCell-head': { borderBottom: 'none' }
                }}
              >
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الرتبة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الاسم</TableCell>

                {dates.map((date, i) => (
                  <TableCell key={i} sx={{ color: 'white', fontWeight: 'bold' }}>
                    {editingHead ? (
                      <TextField
                        type="date"
                        size="small"
                        value={headFormData[i] || ''}
                        onChange={(e) => handleHeadInputChange(i, e.target.value)}
                        sx={{ 
                          backgroundColor: 'white', 
                          borderRadius: 1, 
                          width: 140   // 👈 controls width
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          style: { padding: '6px 8px' } // 👈 makes it look compact
                        }}
                      />
                    ) : (
                      date
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  {editingHead ? (
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={handleApplyHeadClick}
                      >
                        تطبيق
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={handleCancelHeadEdit}
                      >
                        إلغاء
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={handleEditHeadClick}
                    >
                      تعديل
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>

            {/* ---------------- Editable Table Body ---------------- */}
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.rank}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>

                  {reasonColumns.map((reasonType) => (
                    <TableCell key={reasonType}>
                      {editingEmployee === index ? (
                        <TextField
                          size="small"
                          value={editFormData[reasonType] || ''}
                          onChange={(e) => handleInputChange(reasonType, e.target.value)}
                        />
                      ) : (
                        <Typography>
                          {employee.reason && Array.isArray(employee.reason) && employee.reason.includes(reasonType) ? reasonType : '-'}
                        </Typography>
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    {editingEmployee === index ? (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<CheckIcon />}
                          onClick={() => handleApplyClick(index)}
                        >
                          تطبيق
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<CloseIcon />}
                          onClick={handleCancelEdit}
                        >
                          إلغاء
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(employee, index)}
                      >
                        تعديل
                      </Button>
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
        onSave={handleConfirmSave}
        onCancel={handleConfirmDiscard}
        title="تغييرات غير محفوظة في الفنية"
        message="لديك تغييرات غير محفوظة في بيانات الفنية والتواريخ. هل تريد حفظ التغييرات قبل المغادرة؟"
        changesData={getTechnicalChangesData()}
        showChangesPreview={true}
      />
    </Box>
  );
};

export default Technical;
