import { TableCell, TableHead, TableRow } from '@mui/material';

const CustomTableHead = ({ columnsName }) => {
  return (
    <TableHead>
      <TableRow 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '& .MuiTableCell-head': {
            borderBottom: 'none'
          }
        }}
      >
        {columnsName.map((column, index) => (
          <TableCell
            key={index}
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '0.8rem', sm: '0.95rem' },
              py: { xs: 1, sm: 1.5 },
              px: column.style?.px ? column.style.px : { xs: 0.5, sm: 1 },
              letterSpacing: '0.5px',
              minWidth: { xs: 70, sm: 80 },
              textAlign: column.style?.textAlign || 'left'
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
