import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RegisterContainer from '../containers/RegisterContainer';
import { useParams } from 'react-router-dom';

export default function Register() {

  const { mode } = useParams<{ mode: string }>()

  return (
    <Box>
      {mode && <RegisterContainer mode={mode} />}
    </Box>
  )
}
