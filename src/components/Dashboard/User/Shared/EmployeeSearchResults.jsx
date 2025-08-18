import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Paper
} from '@mui/material';
import { Person as PersonIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getAllSquads } from "../../../../util/squadHttp";
import { getAllCategory } from '../../../../util/categoryHttp';

const EmployeeSearchResults = ({ 
  searchResults, 
  isSearchLoading, 
  hasSearched, 
  selectedEmployee, 
  onEmployeeSelect,
  mode = "edit" // "edit" or "delete"
}) => {
  const { data: squadData } = useQuery({
    queryKey: ["squads"],
    queryFn: ({ signal }) => getAllSquads(signal),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getAllCategory(signal),
  });

  // Get category and squad names for display
  const getCategoryName = (categoryId) => {
    const category = categoryData?.data?.find(cat => cat.id === categoryId);
    return category?.name || 'غير محدد';
  };

  const getSquadName = (squadId) => {
    const squad = squadData?.data?.find(sq => sq.id === squadId);
    return squad?.name || 'غير محدد';
  };

  if (isSearchLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (hasSearched && searchResults.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Paper elevation={2} sx={{ borderRadius: 2, p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            لا توجد نتائج
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            لم يتم العثور على أي موظفين مطابقين لكلمة البحث
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          color: 'text.primary' 
        }}
      >
        نتائج البحث ({searchResults.length} موظف)
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {searchResults.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: selectedEmployee?.id === employee.id ? 2 : 1,
                borderColor: selectedEmployee?.id === employee.id ? 'primary.main' : 'divider',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                p: 1,
              }}
              onClick={() => onEmployeeSelect(employee)}
            >
              <CardContent sx={{ pb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {employee.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {employee.jobTitle} - {employee.rank}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {employee.phoneNumber}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={getCategoryName(employee.categoryId)} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={getSquadName(employee.squadId)} 
                    size="small" 
                    color="secondary" 
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              
              <CardActions sx={{ pt: 0 }}>
                <Button 
                  size="small" 
                  variant={selectedEmployee?.id === employee.id ? "contained" : "outlined"}
                  color={mode === "delete" ? "error" : "primary"}
                  startIcon={mode === "delete" ? <DeleteIcon /> : <EditIcon />}
                  fullWidth
                >
                  {mode === "delete" 
                    ? (selectedEmployee?.id === employee.id ? "محدد للحذف" : "اختر للحذف")
                    : (selectedEmployee?.id === employee.id ? "محدد" : "اختر للتعديل")
                  }
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmployeeSearchResults;
