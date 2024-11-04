import React from 'react'
import logo from '../../assets/logo.svg'
import { SxProps } from '@mui/material'
import { StyleOptions } from '@mui/system';

type LogoProps = {
  style?: React.CSSProperties;
}

export default function Logo({ style }: LogoProps) {
  return (
    <img style={style} src={logo} alt="logo" />
  )
}
