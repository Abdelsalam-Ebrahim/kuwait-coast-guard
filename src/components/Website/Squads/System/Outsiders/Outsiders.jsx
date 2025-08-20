import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
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
  Checkbox,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Alert
} from '@mui/material';
import SystemHeader from '../../Ui/SystemHeader';
import printOutsiders from './PrintOutsiders';
import CustomTableHead from '../../Ui/TableHead';
import { useAuth } from '../../../../../store/AuthContext';
import { getAllAbsentEmployeesBySquad } from '../../../../../util/employeeHttp';
import ConfirmationModal from '../../Ui/ConfirmationModal';


const tableHeadContent = [
  { label: 'الرتبة', style: { px: 3 } },
  { label: 'المسمي' },
  { label: 'الاسم' },
  { label: 'السبب' },
  { style: { textAlign: 'center' }, label: 'التاريخ' },
  { style: { textAlign: 'center' }, label: 'من - الى' },
];

const Outsiders = ({ isShownInArchive, onSave, isNav, onNavFreely, isUpdating }) => {
  const theme = useTheme();
  const { token } = useAuth();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [updatedEmployees, setUpdatedEmployees] = useState({ data: [], isChanged: false });

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
  const isPendingReason = false;
  const isErrorReason = false;
  const errorReason = null;

  // const {
  //   data: reasonOptions,
  //   isPending: isPendingReason,
  //   error: errorReason,
  //   isError: isErrorReason
  // } = useQuery({
  //   queryKey: ['reasonOptions'],
  //   queryFn: ({ signal }) => getAllReasonOptions(signal, token),
  // });

  const {
    data: absentEmployees,
    isPending: isPendingAbsent,
    error: errorAbsent,
    isError: isErrorAbsent
  } = useQuery({
    queryKey: ['absentEmployees', id],
    queryFn: ({ signal }) => getAllAbsentEmployeesBySquad(signal, id, token)
  });

  useEffect(() => {
    if (!isPendingAbsent && !isErrorAbsent && absentEmployees?.data) {
      setUpdatedEmployees({ data: structuredClone(absentEmployees.data), isChanged: false });
    }
  }, [absentEmployees, isPendingAbsent, isErrorAbsent]);

  useEffect(() => {
    if(isNav) {
      if(updatedEmployees.isChanged) {
        setShowModal(true);
      } else {
        onNavFreely(true);
      }
    }
  }, [isNav]);


  if (isPendingAbsent) {
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
  
  if (isErrorAbsent) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">حدث خطأ ما</Typography>
          <Typography variant="body2">{errorAbsent.message}</Typography>
        </Alert>
      </Container>
    );
  }

  console.log("absentEmployees: ", absentEmployees.data);
  console.log("updatedEmployees: ", updatedEmployees.data);

  function onUpdateEmployees(index, type, value) {
    setUpdatedEmployees((prev) => {
      const newEmployees = { ...prev };
      newEmployees.data = [...newEmployees.data]; // clone array
      newEmployees.data[index] = { ...newEmployees.data[index], [type]: value, };

      // compare whole array with original absentEmployees
      const isChanged = newEmployees.data.some((emp, i) => emp[type] !== absentEmployees.data[i][type]);

      newEmployees.isChanged = isChanged;
      return newEmployees;
    });
  }

  function handleCancelChanges() {
    setUpdatedEmployees({ data: structuredClone(absentEmployees.data), isChanged: false });
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
      setUpdatedEmployees({ data: structuredClone(absentEmployees.data), isChanged: false });
    }
  }

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ borderRadius: 2, p: { xs: isShownInArchive ? 0 : 1.5, sm: isShownInArchive ? 0 : 2, md: isShownInArchive ? 0 : 3 } }}> 
        {!isShownInArchive && (
          <SystemHeader
            title={"إدارة الغائبين"}
            isPrinting={true}
            isSaving={true}
            hasChanges={updatedEmployees.isChanged}
            printFn={() => printOutsiders('الاولي', employees)}
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
          <Table sx={{ minWidth: 800 }}>
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

                  {/* <TableCell 
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
                        value={employee.reasonId ? employee.reasonId : ''}
                        onChange={(e) => onUpdateEmployees(index, 'reasonId', e.target.value)}
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
                          اختر السبب
                        </MenuItem>
                        
                        {isPendingReason && <MenuItem disabled>جارٍ التحميل...</MenuItem>}
                        
                        {isErrorReason && (
                          <Box maxWidth="sm" sx={{ mt: 4 }}>
                            <Alert severity="error">
                              <Typography variant="h6">حدث خطأ ما</Typography>
                              <Typography variant="body2">{errorReason.message}</Typography>
                            </Alert>
                          </Box>
                        )}

                        {!isPendingReason && !isErrorReason && reasonOptions?.data.map((option) => (
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
                      minWidth: { xs: 60, sm: 80 }
                    }}
                  >
                    <Checkbox
                      checked={employee.checked}
                      value={employee.checked}
                      disabled={!employee.reasonId || isShownInArchive}
                      onChange={(e) => onUpdateEmployees(index, 'dateIsChecked', e.target.checked)}
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
                    {employee.checked ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                          disabled={isShownInArchive}
                          type="date"
                          size="small"
                          value={employee.dateFrom ? employee.dateFrom : ''}
                          onChange={(e) => onUpdateEmployees(index, 'dateFrom', e.target.value)}
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
                          value={employee.dateTo ? employee.dateTo : ''}
                          onChange={(e) => onUpdateEmployees(index, 'dateTo', e.target.value)}
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
                  </TableCell> */}
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

export default Outsiders;
