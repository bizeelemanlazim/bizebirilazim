import React, { useState, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, FormControl, InputLabel, SxProps } from '@mui/material';
import { BblSelectType } from '../../utils/types';
import { debounce } from 'lodash';

type BblAutocompleteProps = {
  label: string;
  value: BblSelectType;
  items: BblSelectType[];
  onSelect: (value?: BblSelectType) => void;
  sx?: SxProps;
  required?: boolean;
  loading?: boolean;
  handleSearch: (searchValue: string) => void;
};

export default function BblAutocomplete({ label, value, items, onSelect, sx, required, loading, handleSearch }: BblAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');

  const debouncedFetchOptions = useCallback(
    debounce((searchValue) => {
      handleSearch(searchValue); // Doğrudan burada handleSearch çağırılıyor
    }, 500),
    [handleSearch] // handleSearch dependency olarak eklenmeli
  );

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
      <Autocomplete
        loading={loading}
        id="autocomplete"
        value={value || ''}
        size='small'
        options={items}
        noOptionsText="Sonuç bulunamadı"
        loadingText="Yükleniyor..."
        filterOptions={(options, state) => options}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue !== '') {
            debouncedFetchOptions(newInputValue);
          }
        }}
        onChange={(event, newValue) => {
          onSelect(newValue || undefined);
          setInputValue(newValue ? newValue.id : '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
}
