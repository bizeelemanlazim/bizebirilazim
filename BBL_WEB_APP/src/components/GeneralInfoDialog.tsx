import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import BblButton from './common/BblButton'
import { Close } from '@mui/icons-material'

type GeneralInfoDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function GeneralInfoDialog({ open, onClose, title, content }: GeneralInfoDialogProps) {
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
            {title}
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            my: 5,
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#000000',
              mb: 3,
            }}
          >
            {content}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
