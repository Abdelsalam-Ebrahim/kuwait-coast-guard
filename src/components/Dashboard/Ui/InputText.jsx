import { Grid, TextField } from '@mui/material';

const InputText = ({ name, label, value, onChange, inputType = 'text' }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        type={inputType}
      />
    </Grid>
  );
}

export default InputText;
