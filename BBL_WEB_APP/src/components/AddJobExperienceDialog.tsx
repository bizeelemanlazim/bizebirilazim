import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BblButton from './common/BblButton';
import { Close } from '@mui/icons-material';
import BblTextInput from './common/BblTextInput';
import BblSelect from './common/BblSelect';
import BblDateInput from './common/BblDateInput';
import { WorkExperienceType } from '../utils/types';
import UtiltySelect from './UtiltySelect';

type AddJobExperienceDialogProps = {
  open: boolean;
  onClose: () => void;
  handleAddExperience: (values: any) => void;
  initialValues?: WorkExperienceType;
}

export default function AddJobExperienceDialog({ open, onClose, initialValues, handleAddExperience }: AddJobExperienceDialogProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [values, setValues] = useState(initialValues ? initialValues : {
    jobId: 0,
    job: '',
    workingCompany: '',
    workingTypeId: 0,
    isWorking: false,
    startDate: '',
    endDate: '',
    description: '',
  })

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    } else {
      setValues({
        jobId: 0,
        job: '',
        workingCompany: '',
        workingTypeId: 0,
        isWorking: false,
        startDate: '',
        endDate: '',
        description: '',
      })
    }
  }, [initialValues])

  const handleChange = (value: any) => {
    setValues(prev => ({ ...prev, ...value }));
  }

  useEffect(() => {
    if (values.isWorking)
      handleChange({ endDate: '' });
  }, [values.isWorking])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Typography>
            Deneyim Ekle
          </Typography>
          <BblButton
            sx={{
              position: 'absolute',
              right: 0,
            }}
            onClick={onClose}
            iconButton
            icon={<Close />}
          />
        </Box>
      </DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddExperience(values);
        }}
      >
        <DialogContent>
          <BblTextInput
            label="Çalıştığı Firma"
            required
            value={values.workingCompany}
            onChange={(e) => handleChange({ workingCompany: e.target.value })}
          />
          <UtiltySelect
            required
            handleChange={(value) => {
              handleChange({ jobId: value.id })
              handleChange({ job: value.name })
            }}
            value={{
              id: values.jobId,
              name: values.job
            }}
            meta={{ type: 'job', label: 'Meslek İsmi' }}
            searchEnabled
          />
          <UtiltySelect
            required
            handleChange={(value) => handleChange({ workingTypeId: value })}
            value={values.workingTypeId || ''}
            meta={{ type: 'workingType', label: 'Çalışma Şekli' }}
          />
          <BblDateInput
            required
            label='İşe Başlama Tarihi'
            value={values.startDate}
            onChange={(value) => handleChange({ startDate: value })}
          />
          <BblDateInput
            required={!values.isWorking}
            label='İşten Ayrılma Tarihi'
            value={values.endDate}
            disabled={values.isWorking}
            onChange={(value) => handleChange({ endDate: value })}
          />
          <FormControlLabel
            sx={{ m: 0, ml: -1 }}
            control={
              <Switch
                checked={values.isWorking}
                onChange={(e) => handleChange({ isWorking: e.target.checked })}
              />
            }
            label={
              <Typography fontSize={matches ? 16 : 10} fontWeight={700}>
                Halen Çalışıyorum
              </Typography>
            }
          />
          <BblTextInput
            required
            label="Açıklama"
            value={values.description}
            onChange={(e) => handleChange({ description: e.target.value })}
            multiline
            rows={4}
            sx={{
              mt: 4
            }}
          />
        </DialogContent>
        <DialogActions>
          <BblButton
            label='İptal'
            variant="outlined"
            onClick={onClose}
          />
          <BblButton
            label='Kaydet'
            variant="contained"
            type='submit'
          />
        </DialogActions>
      </form>
    </Dialog>
  )
}
