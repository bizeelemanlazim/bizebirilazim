import { Autocomplete, Checkbox, FormControl, SxProps, TextField } from '@mui/material'
import React from 'react'
import { BblSelectType } from '../../utils/types';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type BblAutocompleteProps = {
  label: string;
  values: BblSelectType[];
  items: BblSelectType[];
  onSelect: (value: BblSelectType[]) => void;
  sx?: SxProps;
  required?: boolean;
  loading?: boolean;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function BblMultiSelect({ label, values, items, onSelect, sx, required, loading }: BblAutocompleteProps) {
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
      fullWidth
    >
      <Autocomplete
        multiple={true}
        id="checkboxes-tags-demo"
        size='small'
        options={items}
        value={values || []}
        onChange={(event, newValue) => { onSelect(newValue) }}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name} {/* Burada option.name kullanılıyor */}
          </li>
        )}
        style={{ width: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={label} />
        )}
      />
    </FormControl>
  )
}
