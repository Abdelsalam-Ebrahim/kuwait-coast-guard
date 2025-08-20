import React, { useState, useEffect, useRef } from 'react';
import { 
  Paper, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  Typography,
  CircularProgress,
  Container,
  Alert
} from '@mui/material';
import SystemHeader from '../../Ui/SystemHeader';
import ConfirmationModal from '../../Ui/ConfirmationModal';
import printOperations from './PrintOperations';
import CustomTableHead from '../../Ui/TableHead';
import { getAllReceivingPlaces } from '../../../../../util/receivingPlaceHttp';
import { getDistributionEmployeesBySquad } from '../../../../../util/employeeHttp';
import { useAuth } from '../../../../../store/AuthContext';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const tableHeadContent = [
  { label: 'الرتبة', style: { px: 3 } },
  { label: 'المسمى الوظيفي' },
  { label: 'الاسم' },
  { label: 'التوزيع' },
  { label: 'مكان الاستلام' },
  { label: 'الهاتف', style: { textAlign: 'center' } },
];

const Operations = ({ isShownInArchive, onSave, isNav, onNavFreely, isUpdating }) => {
  const theme = useTheme();
  const { token } = useAuth();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [updatedEmployees, setUpdatedEmployees] = useState({ data: [], isChanged: false });

  const {
    data: receivingPlaces,
    isPending: isPendingReceiving,
    error: errorReceiving,
    isError: isErrorReceiving
  } = useQuery({
    queryKey: ['receivingPlaces'],
    queryFn: ({ signal }) => getAllReceivingPlaces(signal, token),
  });

  const {
    data: distributedEmployees,
    isPending: isPendingDistributed,
    error: errorDistributed,
    isError: isErrorDistributed
  } = useQuery({
    queryKey: ['distributedEmployees', id],
    queryFn: ({ signal }) => getDistributionEmployeesBySquad(signal, id, token)
  });

  useEffect(() => {
    if (!isPendingDistributed && !isErrorDistributed && distributedEmployees?.data) {
      setUpdatedEmployees({ data: structuredClone(distributedEmployees.data), isChanged: false });
    }
  }, [distributedEmployees, isPendingDistributed, isErrorDistributed]);

  useEffect(() => {
    if(isNav) {
      if(updatedEmployees.isChanged) {
        setShowModal(true);
      } else {
        onNavFreely(true);
      }
    }
  }, [isNav]);


  if (isPendingDistributed) {
    return (
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  if (isErrorDistributed) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">حدث خطأ ما</Typography>
          <Typography variant="body2">{errorDistributed.message}</Typography>
        </Alert>
      </Container>
    );
  }

  function onUpdateEmployees(index, value) {
    setUpdatedEmployees((prev) => {
      const newEmployees = { ...prev };
      newEmployees.data = [...newEmployees.data]; // clone array
      newEmployees.data[index] = { ...newEmployees.data[index], 'receivingPlaceId': value, };

      // compare whole array with original distributedEmployees
      const isChanged = newEmployees.data.some((emp, i) => emp['receivingPlaceId'] !== distributedEmployees.data[i]['receivingPlaceId']);

      newEmployees.isChanged = isChanged;
      return newEmployees;
    });
  }

  function handleCancelChanges() {
    setUpdatedEmployees({ data: structuredClone(distributedEmployees.data), isChanged: false });
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
      setUpdatedEmployees({ data: structuredClone(distributedEmployees.data), isChanged: false });
    }
  }

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}>      
        {!isShownInArchive && (
          <SystemHeader
            title="إدارة العمليات"
            isPrinting={true}
            isSaving={true}
            hasChanges={updatedEmployees.isChanged}
            printFn={() => printOperations('الاولي', employees)}
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
          <Table sx={{ minWidth: 650 }}>
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
                    {employee.name}
                  </TableCell>

                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 80, sm: 100 }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        fontWeight: employee.distribution ? 600 : 400,
                        color: employee.distribution ? 'success.main' : 'text.secondary',
                        backgroundColor: employee.distribution ? 'rgba(76, 175, 80, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                        px: { xs: 0.5, sm: 1.5 },
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {employee.distributionPlaceName}
                    </Typography>
                  </TableCell>

                  <TableCell 
                    sx={{ 
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                      minWidth: { xs: 100, sm: 120 }
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 120 } }}>
                      <Select
                        disabled={isShownInArchive}
                        value={employee.receivingPlaceId ? employee.receivingPlaceId : ''}
                        onChange={(e) => onUpdateEmployees(index, e.target.value)}
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
                      >
                        <MenuItem value="" disabled sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: 'text.secondary' }}>
                          اختر المكان
                        </MenuItem>

                        {isPendingReceiving && <MenuItem disabled>جارٍ التحميل...</MenuItem>}

                        {isErrorReceiving && (
                          <Box maxWidth="sm" sx={{ mt: 4 }}>
                            <Alert severity="error">
                              <Typography variant="h6">حدث خطأ ما</Typography>
                              <Typography variant="body2">{errorReceiving.message}</Typography>
                            </Alert>
                          </Box>
                        )}

                        {!isPendingReceiving && !isErrorReceiving && receivingPlaces?.data.map((option) => (
                          <MenuItem key={option.id} value={option.id} sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                            {option.name}
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
                      minWidth: { xs: 90, sm: 110 }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        fontWeight: 500,
                        color: 'text.primary',
                        direction: 'ltr'
                      }}
                    >
                      {employee.phoneNumber}
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

export default Operations;
