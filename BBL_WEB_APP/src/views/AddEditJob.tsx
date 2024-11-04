import { Box } from '@mui/material'
import React from 'react'
import AddEditJobContainer from '../containers/AddEditJobContainer'
import ViewLayout from '../components/common/ViewLayout'
import { useParams } from 'react-router-dom';

export default function AddEditJob() {

  const { id } = useParams();

  return (
    <ViewLayout>
      <AddEditJobContainer id={id ? +id : undefined} />
    </ViewLayout>
  )
}
