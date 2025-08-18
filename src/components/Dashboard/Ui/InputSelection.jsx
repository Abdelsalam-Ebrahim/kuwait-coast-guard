import { Alert, Box, CircularProgress, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';

const InputSelection = ({ data, name, value, onChange, isPending, isError, error, label, creatingText }) => {

  if (isPending) {
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

  if (isError) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">حدث خطأ ما</Typography>
          <Typography variant="body2">{error.message}</Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        select
        label={label}
        value={value ?? ''}
        onChange={(e) => onChange(name, e.target.value)}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        helperText={creatingText || ''}
      >
        {data?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}

export default InputSelection;
