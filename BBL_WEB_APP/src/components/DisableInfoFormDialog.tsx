import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import BblButton from './common/BblButton'
import { Close } from '@mui/icons-material'
import BblSelect from './common/BblSelect'
import BblTextInput from './common/BblTextInput'

type DisableInfoFormDialogProps = {
  open: boolean
  onClose: () => void
}

export default function DisableInfoFormDialog({ open, onClose }: DisableInfoFormDialogProps) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
            Engellilik Durumu Detayları
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
      <DialogContent>
        <Box>
          <BblSelect
            label="Kateogori"
            items={[
              { id: 'Görme Engelli', name: 'Görme Engelli' },
              { id: 'İşitme Engelli', name: 'İşitme Engelli' },
              { id: 'Fiziksel Engelli', name: 'Fiziksel Engelli' },
              { id: 'Zihinsel Engelli', name: 'Zihinsel Engelli' },
            ]}
            onSelect={() => { }}
            value=''
          />
          <BblSelect
            label="Yüzdesi"
            items={[
              { id: '10%', name: '1' },
              { id: '20%', name: '2' },
              { id: '30%', name: '3' },
              { id: '40%', name: '4' },
              { id: '50%', name: '5' },
              { id: '60%', name: '6' },
              { id: '70%', name: '7' },
              { id: '80%', name: '8' },
              { id: '90%', name: '9' },
              { id: '100%', name: '10' },
            ]}
            onSelect={() => { }}
            value=''
          />
          <FormControlLabel sx={{ m: 0 }}
            control={<Switch defaultChecked />}
            label={<Typography fontSize={matches ? 14 : 10} fontWeight={500}>Sağlık Raporu</Typography>}
          />
          <FormControlLabel sx={{ m: 0 }}
            control={<Switch defaultChecked />}
            label={<Typography fontSize={matches ? 14 : 10} fontWeight={500}>Belli başlı işleri yapmasına engel kronik bir rahatsızlık var mı?</Typography>}
          />
          <BblTextInput
            label="Açıklama"
            value=""
            multiline
            rows={4}
            onChange={() => { }}
          />
          <FormControlLabel sx={{ m: 0 }}
            control={<Switch defaultChecked />}
            label={<Typography fontSize={matches ? 14 : 10} fontWeight={500}>Arada bilinç kaybına sebep olacak bir durumu oluyor mu?</Typography>}
          />
          <BblTextInput
            label="Açıklama"
            value=""
            multiline
            rows={4}
            onChange={() => { }}
          />
          <FormControlLabel sx={{ m: 0 }}
            control={<Switch defaultChecked />}
            label={<Typography fontSize={matches ? 14 : 10} fontWeight={500}>Bulaşıcı bir hastalık var mı?</Typography>}
          />
          <BblTextInput
            label="Açıklama"
            value=""
            multiline
            rows={4}
            onChange={() => { }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <BblButton
          onClick={onClose}
          variant="outlined"
          label='Vazgeç'
        />
        <BblButton
          onClick={onClose}
          variant="contained"
          label='Kaydet'
        />
      </DialogActions>
    </Dialog>
  )
}
