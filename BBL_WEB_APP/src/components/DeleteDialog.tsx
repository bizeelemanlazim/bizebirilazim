import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  deleting?: boolean;
}

export default function DeleteDialog({ open, onClose, onConfirm, title, description, deleting }: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <Typography>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={onClose}
          sx={{
            textTransform: 'none'
          }}
        >
          İptal
        </Button>
        <LoadingButton
          variant='contained'
          loading={deleting}
          onClick={onConfirm}
          sx={{
            textTransform: 'none'
          }}
        >
          Sil
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
