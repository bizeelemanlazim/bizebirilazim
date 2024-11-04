import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Rating, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import BblButton from './common/BblButton';
import { Close } from '@mui/icons-material';
import BblTextInput from './common/BblTextInput';
import BblSelect from './common/BblSelect';
import BblDateInput from './common/BblDateInput';
import { SkillInfoType } from '../utils/types';
import UtiltySelect from './UtiltySelect';

type AddSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: SkillInfoType;
}

export default function AddSkillDialog({ open, onClose, onSubmit, initialValues }: AddSkillDialogProps) {

  const theme = useTheme();
  const [values, setValues] = React.useState(initialValues ? initialValues : {
    abilityName: '',
    description: '',
    degree: 0,
  });

  const handleChange = (value: any) => {
    setValues({ ...values, ...value })
  }

  useEffect(() => {
    if (initialValues){
      setValues(initialValues);
    } else{
      setValues({
        abilityName: '',
        description: '',
        degree: 0,
      })
    }
  }, [initialValues])

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
            Beceri Bilgisi Ekle
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
          onSubmit(values);
          setValues({
            abilityName: '',
            description: '',
            degree: 0,
          })
        }}
      >
        <DialogContent>
          <BblTextInput
            required
            label="Beceri"
            value={values.abilityName}
            onChange={(e) => handleChange({ abilityName: e.target.value })}
          />
          <BblTextInput
            required
            label="Açıklama"
            value={values.description}
            onChange={(e) => handleChange({ description: e.target.value })}
            multiline
            rows={4}
          />
          <Box>
            <Typography>
              Derecesi
            </Typography>
            <Rating
              size='large'
              defaultValue={2}
              value={values.degree}
              onChange={(e, v) => handleChange({ degree: v })}
              name="simple-controlled"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <BblButton
            label='İptal'
            variant="outlined"
            onClick={onClose}
          />
          <BblButton
            label='Kaydet'
            type='submit'
            variant="contained"
          />
        </DialogActions>
      </form>
    </Dialog>
  )
}
