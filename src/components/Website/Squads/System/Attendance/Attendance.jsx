import { useEffect, useState } from 'react';
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

import printAttendance from './PrintAttendance';
import CustomTableHead from '../../Ui/TableHead';
import ConfirmationModal from '../../Ui/ConfirmationModal';


const tableHeadContent = [
  { label: 'الحضور', style: { px: 2 } },
  { label: 'المسمى الوظيفي' },
  { label: 'الرتبة' },
  { label: 'الاسم الكامل' },
  { label: 'الفئة' }
];

const Attendance = ({ employees, isShownInArchive, onSave, isNav, onNavFreely, isUpdating }) => {
  const theme = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [updatedEmployees, setUpdatedEmployees] = useState({ data: [], isChanged: false });


  useEffect(() => {
    setUpdatedEmployees({ data: structuredClone(employees), isChanged: false });
  }, [employees]);

  useEffect(() => {
    if(isNav) {
      if(updatedEmployees.isChanged) {
        setShowModal(true);
      } else {
        onNavFreely(true);
      }
    }
  }, [isNav]);


  function onUpdateEmployees(index, value) {
    setUpdatedEmployees((prev) => {
      const newEmployees = { ...prev };
      newEmployees.data = [...newEmployees.data]; // clone array
      newEmployees.data[index] = { ...newEmployees.data[index], 'attendance': value };

      // compare whole array with original employees
      const isChanged = newEmployees.data.some((emp, i) => emp['attendance'] !== employees[i]['attendance']);

      newEmployees.isChanged = isChanged;
      return newEmployees;
    });
  }

  function handleCancelChanges() {
    setUpdatedEmployees({ data: structuredClone(employees), isChanged: false });
    setShowModal(false);
    onNavFreely(true);
  }

  function handleClosingModal() {
    setShowModal(false);
    onNavFreely(false);
  }

  async function handleOnSubmit() {
    const isChanged = await onSave(updatedEmployees.data);
    setShowModal(false);

    if(isChanged) {
      setUpdatedEmployees((prev) => ({ ...prev, isChanged: false }));
    } else {
      setUpdatedEmployees({ data: structuredClone(employees), isChanged: false });
    }
  }

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}>
        {!isShownInArchive && (
          <SystemHeader
            title="إدارة الحضور"
            isPrinting={true}
            isSaving={true}
            hasChanges={updatedEmployees.isChanged}
            printFn={() => printAttendance('الاولي', updatedEmployees.data)}
            saveFn={() => setShowModal(true)}
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
              {updatedEmployees.data.map((employee, index) => (
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
                      onChange={(e) => onUpdateEmployees(index, e.target.checked)}
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
        open={showModal}
        changesData={[]}
        showChangesPreview={true}
        onClose={handleClosingModal}
        onCancel={handleCancelChanges}
        onSave={handleOnSubmit}
        isLoading={isUpdating}
      />
    </Box>
  );
};

export default Attendance;
