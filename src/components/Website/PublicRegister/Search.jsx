import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const Search = ({ onSearch, onClear, searchResults }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ searchTerm });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Paper 
        elevation={1} 
        sx={{ 
          p: { xs: 1.5, sm: 2, md: 3 }, 
          borderRadius: 2
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', sm: 'center' }, 
            mb: 3,
            gap: { xs: 2, sm: 1 }
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              textAlign: { xs: 'center', sm: 'right' }
            }}
          >
            السجل العام للسرايا الثلاث
          </Typography>
          
          {/* صندوق البحث */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              width: { xs: '100%', sm: 'auto' },
              alignItems: 'center'
            }}
          >
            <TextField
              placeholder="البحث بالاسم أو رقم السواحل..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 300 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={clearSearch}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleSearchClick}
              size="small"
              sx={{
                minHeight: 40,
                px: 3,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: 6,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              startIcon={<SearchIcon />}
            >
              بحث
            </Button>
          </Box>
        </Box>

        {/* عرض عدد النتائج */}
        {searchResults && searchResults.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              تم العثور على {searchResults?.length || 0} نتيجة
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Search;
