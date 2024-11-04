import React from 'react'
import ViewLayout from '../components/common/ViewLayout'
import JobSummaryContainer from '../containers/JobSummaryContainer'
import { useParams } from 'react-router-dom';

export default function JobSummary() {

  const { id } = useParams();

  return (
    <JobSummaryContainer id={+id!} />
  )
}
