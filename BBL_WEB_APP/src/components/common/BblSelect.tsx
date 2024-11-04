import { CircularProgress, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { BblSelectType } from '../../utils/types';
import { useState } from 'react';

type BblSelectProps = {
  label: string;
  value: string;
  items: BblSelectType[];
  onSelect: (value: string) => void;
  sx?: SxProps;
  required?: boolean;
  loading?: boolean;
}

export default function BblSelect({ label, value, items, onSelect, sx, required, loading }: BblSelectProps) {

  return (
    <FormControl
      size='small'
      required={required}
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
      fullWidth>
      <InputLabel
        id="demo-simple-select-label"
      >
        {label}
      </InputLabel>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress size={12} />
        </Box>
      ) : (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || ''}
          label={label}
          onChange={(e) => onSelect(e.target.value as string)}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}