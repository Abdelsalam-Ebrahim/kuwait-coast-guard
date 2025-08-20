import { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import SystemHeader from '../../Ui/SystemHeader';
import printDistribution from './PrintDistribution';
import CustomTableHead from '../../Ui/TableHead';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "../../../../../store/AuthContext";
import { getAllDistributedPlaces } from '../../../../../util/distributionPlace';
import { getAllPresentEmployeesBySquad } from '../../../../../util/employeeHttp';
import { useParams } from 'react-router-dom';
import ConfirmationModal from '../../Ui/ConfirmationModal';


const tableHeadContent = [
  { label: 'الرتبة', style: { px: 3 } },
  { label: 'المسمى الوظيفي' },
  { label: 'الاسم' },
  { label: 'التوزيع', style: { textAlign: 'center' } },
];

const Distribution = ({ isShownInArchive, onSave, isNav, onNavFreely, isUpdating }) => {
  const theme = useTheme();
  const { token } = useAuth();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [updatedEmployees, setUpdatedEmployees] = useState({ data: [], isChanged: false });

  const {
    data: distributionPlaces,
    isPending: isPendingDistribution,
    error: errorDistribution,
    isError: isErrorDistribution
  } = useQuery({
    queryKey: ['distributionPlaces'],
    queryFn: ({ signal }) => getAllDistributedPlaces(signal, token),
  });

  const {
    data: presentEmployees,
    isPending: isPendingPresent,
    error: errorPresent,
    isError: isErrorPresent
  } = useQuery({
    queryKey: ['presentEmployees', id],
    queryFn: ({ signal }) => getAllPresentEmployeesBySquad(signal, id, token)
  });

  useEffect(() => {
    if (!isPendingPresent && !isErrorPresent && presentEmployees?.data) {
      setUpdatedEmployees({ data: structuredClone(presentEmployees.data), isChanged: false });
    }
  }, [presentEmployees, isPendingPresent, isErrorPresent]);

  
  useEffect(() => {
    if(isNav) {
      if(updatedEmployees.isChanged) {
        setShowModal(true);
      } else {
        onNavFreely(true);
      }
    }
  }, [isNav]);

  if (isPendingPresent) {
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
  
  if (isErrorPresent) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">حدث خطأ ما</Typography>
          <Typography variant="body2">{errorPresent.message}</Typography>
        </Alert>
      </Container>
    );
  }

  function onUpdateEmployees(index, value) {
    setUpdatedEmployees((prev) => {
      const newEmployees = { ...prev };
      newEmployees.data = [...newEmployees.data]; // clone array
      newEmployees.data[index] = { ...newEmployees.data[index], 'distributionPlaceId': value, };

      // compare whole array with original presentEmployees
      const isChanged = newEmployees.data.some((emp, i) => emp['distributionPlaceId'] !== presentEmployees.data[i]['distributionPlaceId']);

      newEmployees.isChanged = isChanged;
      return newEmployees;
    });
  }

  function handleCancelChanges() {
    setUpdatedEmployees({ data: structuredClone(presentEmployees.data), isChanged: false });
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
      setUpdatedEmployees({ data: structuredClone(presentEmployees.data), isChanged: false });
    }
  }

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}>
        {!isShownInArchive && (
          <SystemHeader
            title="إدارة التوزيع"
            isPrinting={true}
            isSaving={true}
            hasChanges={updatedEmployees.isChanged}
            printFn={() => printDistribution('الاولي', updatedEmployees.data)}
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
                      textAlign: 'center',
                      minWidth: { xs: 120, sm: 140 }
                    }}
                  >
                    <FormControl size="small" sx={{ minWidth: { xs: 110, sm: 140 } }}>
                      <Select
                        disabled={isShownInArchive}
                        value={employee.distributionPlaceId ? employee.distributionPlaceId : ''}
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
                          },
                        }}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 400 }}}}
                      >
                        <MenuItem value="" disabled sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: 'text.secondary' }}>
                          اختر التوزيع
                        </MenuItem>

                        {isPendingDistribution && <MenuItem disabled>جارٍ التحميل...</MenuItem>}

                        {isErrorDistribution && (
                          <Box maxWidth="sm" sx={{ mt: 4 }}>
                            <Alert severity="error">
                              <Typography variant="h6">حدث خطأ ما</Typography>
                              <Typography variant="body2">{errorDistribution.message}</Typography>
                            </Alert>
                          </Box>
                        )}

                        {!isPendingDistribution && !isErrorDistribution && distributionPlaces?.data.map((option) => (
                          <MenuItem key={option.id} value={option.id} sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                            {option.name}
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

export default Distribution;
