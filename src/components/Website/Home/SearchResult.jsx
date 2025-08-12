import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Grow from '@mui/material/Grow'
import Slide from '@mui/material/Slide'

// Props: { results: Array<{ id, name, title, distribution, pickupLocation, date }>, loading: boolean, query: string }
const SearchResult = ({ results = [], loading = false, query = '' }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (results.length === 0) {
    return query.trim() ? (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        لا توجد نتائج مطابقة لبحثك.
      </Typography>
    ) : null
  }

  return (
    <>
      <Grow in={true} timeout={800}>
        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant="body2" color="text.secondary">
            عدد النتائج: {results.length}
          </Typography>
        </Box>
      </Grow>
      <Grow in={true} timeout={800}>
        <TableContainer
          component={Paper}
          sx={{ 
            borderRadius: 2, 
            boxShadow: 2, 
            maxHeight: { xs: 360, md: 480 }, 
            overflowX: 'auto',
            transform: 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.002)',
              boxShadow: 3,
            }
          }}
        >
          <Table size="small" stickyHeader aria-label="نتائج البحث">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }}>اليوم</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }}>التاريخ</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }}>الاسم</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }}>المسمى</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }}>التوزيع</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }}>مكان الاستلام</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item, index) => {
                const d = new Date(item.date)
                const dayName = d.toLocaleDateString('ar-EG', { weekday: 'long' })
                const dateStr = d.toLocaleDateString('ar-EG')
                return (
                  <Slide key={item.id} direction="up" in={true} timeout={700 + (index * 100)} style={{ transitionDelay: `${index * 50}ms` }}>
                    <TableRow
                      hover
                      sx={{
                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                        '&:hover': { 
                          bgcolor: 'action.selected',
                          transform: 'translateX(4px)',
                          transition: 'all 0.2s ease-in-out'
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <TableCell align="center" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.75, sm: 1.25 } }}>{dayName}</TableCell>
                      <TableCell align="center" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.75, sm: 1.25 } }}>{dateStr}</TableCell>
                      <TableCell align="center" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.75, sm: 1.25 } }}>
                        <Box sx={{ maxWidth: { xs: 140, sm: 220 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.75, sm: 1.25 } }}>
                        <Box sx={{ maxWidth: { xs: 140, sm: 220 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</Box>
                      </TableCell>
                      <TableCell align="center" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.75, sm: 1.25 } }}>
                        <Box sx={{ maxWidth: { xs: 120, sm: 200 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.distribution}</Box>
                      </TableCell>
                      <TableCell align="center" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.75, sm: 1.25 } }}>
                        <Box sx={{ maxWidth: { xs: 140, sm: 220 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.pickupLocation}</Box>
                      </TableCell>
                    </TableRow>
                  </Slide>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grow>
    </>
  )
}

export default SearchResult
