import { LoadingButton } from '@mui/lab'
import { Button, IconButton, SxProps, useTheme } from '@mui/material'
import React from 'react'

type BblButtonProps = {
  preIcon?: React.ReactNode
  postIcon?: React.ReactNode
  label?: string
  onClick?: (e: any) => void
  sx?: SxProps
  variant?: 'outlined' | 'contained' | 'text'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  size?: 'small' | 'medium' | 'large',
  iconButton?: boolean,
  icon?: React.ReactNode,
  type?: 'submit' | 'reset',
  loading?: boolean,
  disabled?: boolean,
}

export default function BblButton({ disabled, type, iconButton, icon, size, preIcon, postIcon, label, onClick, sx, variant = 'outlined', textTransform = "capitalize", loading }: BblButtonProps) {

  const theme = useTheme();

  return (
    <>
      {iconButton ? (
        <IconButton
          onClick={onClick}
          disabled={disabled}
          size={size}
          sx={{
            p: 0,
            m: 0,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            ...sx,
          }}
        >
          {icon}
        </IconButton>
      ) : (
        <LoadingButton
          disabled={disabled}
          loading={loading}
          onClick={onClick}
          variant={variant}
          size={size}
          type={type || 'button'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: textTransform,
            ...sx,
          }}
        >
          {preIcon && (
            <span
              style={{
                marginRight: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {preIcon}
            </span>
          )}
          {label && <span>{label}</span>}
          {postIcon && (
            <span
              style={{
                marginLeft: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {postIcon}
            </span>
          )}
        </LoadingButton>
      )}
    </>

  )
}
