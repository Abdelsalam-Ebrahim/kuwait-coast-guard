import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon
} from '@mui/icons-material';

const SearchInput = ({ onSearch, isShowAll, isSelectAll, onSelectAll, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Call the onSearch prop function with the search term (can be empty)
    if (onSearch) {
      await onSearch(searchTerm);
    } else {
      // Fallback simulation if no onSearch prop provided
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Searching for:', searchTerm);
    }
    
    setIsSearching(false);
  };

  const handleShowAll = async () => {
    setSearchTerm(''); // Clear the search term
    setIsSearching(true);
    
    // Call the onSearch prop function with empty string to show all
    if (onSearch) {
      await onSearch('');
    }
    
    setIsSearching(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: 3, 
          borderRadius: 2,
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 600, 
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <SearchIcon color="primary" />
          البحث عن المستخدمين
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'flex-start' }
        }}>

          <TextField
            fullWidth
            variant="outlined"
            placeholder={placeholder || "ابحث بالاسم أو الرقم..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isSearching}
            sx={{
              minWidth: { xs: '100%', sm: 120 },
              height: 56,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {isSearching ? <CircularProgress size={20} color="inherit" /> : 'بحث'}
          </Button>

          {
            isShowAll && (
              <Button
                variant="outlined"
                onClick={handleShowAll}
                disabled={isSearching}
                sx={{
                  minWidth: { xs: '100%', sm: 120 },
                  height: 56,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                عرض الكل
              </Button>
            )
          }

          {isSelectAll && (
            <Button
              variant="contained"
              color="success"
              onClick={onSelectAll}
              sx={{
                minWidth: { xs: '100%', sm: 140 },
                height: 56,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                whiteSpace: 'nowrap'
              }}
            >
              تحديد الكل
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchInput;
