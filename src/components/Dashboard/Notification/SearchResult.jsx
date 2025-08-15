import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Checkbox,
  Card,
  CardContent
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const SearchResult = ({ 
  searchResults, 
  selectedUsers, 
  onUserSelect, 
  onSelectAll, 
  hasSearched 
}) => {
  if (!hasSearched) {
    return null;
  }

  const handleSelectAll = () => {
    onSelectAll();
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mb: 3, 
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        mx: { xs: 2, sm: 3 }
      }}
    >
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.default'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PersonIcon color="primary" />
            نتائج البحث ({searchResults.length})
          </Typography>
          
          {searchResults.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleSelectAll}
              sx={{ borderRadius: 2 }}
            >
              {selectedUsers.length === searchResults.length ? 'إلغاء الكل' : 'تحديد الكل'}
            </Button>
          )}
        </Box>
      </Box>

      {searchResults.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            لم يتم العثور على أي نتائج مطابقة
          </Typography>
        </Box>
      ) : (
        <Box sx={{ 
          p: { xs: 2, sm: 3 },
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(250px, 1fr))',
            sm: 'repeat(auto-fit, minmax(280px, 1fr))',
            md: 'repeat(auto-fit, minmax(300px, 1fr))'
          },
          gap: 2
        }}>
          {searchResults.map((user) => (
            <Card
              key={user.id}
              onClick={(e) => {
                e.preventDefault();
                onUserSelect(user.id);
              }}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                border: 2,
                borderColor: selectedUsers.includes(user.id) 
                  ? 'primary.main' 
                  : 'divider',
                backgroundColor: selectedUsers.includes(user.id) 
                  ? 'action.selected' 
                  : 'background.paper',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                  borderColor: 'primary.main'
                }
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: 1
                }}>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onUserSelect(user.id);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    color="primary"
                    sx={{ 
                      p: 0.5,
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.2rem'
                      }
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: 'text.primary',
                        mb: 0.5,
                        lineHeight: 1.3
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        fontWeight: 500
                      }}
                    >
                      الرقم: {user.number}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default SearchResult;
