import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import BblButton from './common/BblButton';
import { Close } from '@mui/icons-material';
import BblTextInput from './common/BblTextInput';
import { enqueueSnackbar } from 'notistack';
import { RateType } from '../utils/types';

type RateDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading?: boolean;
  type: 'Employee' | 'Employer';
  selectedRate: RateType | null;
}

export default function RateDialog({ open, onClose, onSubmit, loading, type, selectedRate }: RateDialogProps) {

  const [rate, setRate] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [rateError, setRateError] = React.useState(false);
  const placeHolder = type === 'Employee' ? 'Anlaşılan mesai saatlerine uyulması, işin net açıklanması, çalışma ortamı vb.' : 'Mesai saatlerine uygunluk, yapılan işin doğruluğu vb.';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (rate === 0) {
      setRateError(true);
      return;
    }
    onSubmit({ rate, comment });
  }

  useEffect(() => {
    if (open) {
      setRate(selectedRate?.rate || 0);
      setComment(selectedRate?.comment || '');
    }
  }, [open, selectedRate])

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
            Değerlendirme Yap
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
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,

            }}
          >
            <Rating
              name="simple-controlled"
              value={rate}
              size='large'
              onChange={(event, newValue) => {
                newValue && setRateError(false);
                setRate(newValue as number);
              }}
            />
            {rateError && (
              <Typography
                sx={{
                  color: 'error.main',
                  fontSize: 12,
                }}
              >
                Değerlendirme yapmalısınız.
              </Typography>
            )}
            <BblTextInput
              required
              label="Yorum"
              placeholder={placeHolder}
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <BblButton
            label="İptal"
            onClick={onClose}
            variant="outlined"
          />
          <BblButton
            loading={loading}
            type="submit"
            label="Değerlendir"
            variant="contained"
          />
        </DialogActions>
      </form>
    </Dialog>
  )
}
