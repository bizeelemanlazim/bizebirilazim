import { SxProps } from '@mui/material';
import { DesktopTimePicker, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type BblTimeInputProps = {
  label: string;
  value: string;
  onChange: (date: string) => void;
  sx?: SxProps;
  disabled?: boolean;
  required?: boolean;
};

export default function BblTimeInput({
  label,
  value,
  onChange,
  disabled,
  required,
  sx
}: BblTimeInputProps) {

  const getData = (value: string) => {
    if(!value) return null;
    const dateValue = dayjs(value, 'HH:mm');
    return dateValue;
  }

  const handleChanges = (newValue: string) => {
    //convert to HH:mm
    const dateValue = dayjs(newValue).format('HH:mm');
    onChange(dateValue);

  }

  return (
    <TimePicker
      label={label}
      value={getData(value)}
      format='HH:mm'
      localeText={{
        okButtonLabel: 'Tamam',
        toolbarTitle: 'Saat Seçiniz',
        clearButtonLabel: 'Temizle',
        cancelButtonLabel: 'İptal',
      }}
      onChange={(newValue: any) => handleChanges(newValue as string)}
      sx={{
        ...sx,
        my: 1,
        width: '100%',
        boxShadow: '0px 0px 5px rgba(49, 79, 124, 0.1)',
        borderRadius: '8px',
        //label text color
        '& .MuiFormLabel-root': {
          mt: -0.75
        },
        //input base height 40px
        '& .MuiInputBase-root': {
          height: '40px',
        },
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
      }}
    />
  )
}
