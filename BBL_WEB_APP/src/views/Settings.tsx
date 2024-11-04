import React, { useContext } from 'react'
import ViewLayout from '../components/common/ViewLayout'
import EmployerSettingsContainer from '../containers/EmployerSettingsContainer'
import { AppContext } from '../contexts/AppContext';
import EmployeeSettingsContainer from '../containers/EmployeeSettingsContainer';
import { AuthContext } from '../contexts/AuthContext';

export default function Settings() {

  const { role } = useContext(AuthContext);

  return (
    <ViewLayout>
      {
        role === 'Employer' ? (
          <EmployerSettingsContainer />
        ) : role === 'Employee' ?  (
          <EmployeeSettingsContainer />
        ) : <></>
      }
    </ViewLayout>
  )
}
