import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          © 2025 القطاع الأوسط - خفر السواحل
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;