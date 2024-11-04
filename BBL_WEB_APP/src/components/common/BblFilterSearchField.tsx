import { Box, Button, SxProps, TextField } from '@mui/material';
import { useState } from 'react';

type BblFilterSearchFieldProps = {
  label: string;
  sx?: SxProps;
  value: string;
  onChange: (value: string) => void;
}

export default function BblFilterSearchField({ label, sx, value, onChange }: BblFilterSearchFieldProps) {

  const [text, setText] = useState(value)

  const handleSearch = () => {
    onChange(text)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <TextField
        label={label}
        value={text}
        onChange={(e) => { setText(e.target.value) }}
        InputLabelProps={{
          style: {
            fontSize: 14
          }
        }}
        autoComplete="new-password"
        variant="outlined"
        // value={value}
        size="small"
        // onChange={onChange}
        sx={{
          my: 1,
          width: '100%',
          boxShadow: '0px 0px 5px rgba(49, 79, 124, 0.1)',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E5E5E5',
            },
            '&:hover fieldset': {
              borderColor: '#E5E5E5',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E5E5E5',
            },
          },
          ...sx,
        }}
      />
      <Button
        onClick={handleSearch}
        sx={{
          position: 'absolute',
          right: 0
        }}
        variant="contained">
        Ara
      </Button>
    </Box>
  )
}
