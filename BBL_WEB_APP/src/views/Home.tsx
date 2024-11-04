import { useContext } from 'react';
import Reports from './Reports';
import { AuthContext } from '../contexts/AuthContext';
import Jobs from './Jobs';

export default function Home() {

  const { role } = useContext(AuthContext);

  return (
    role === 'Employer' ?
      <Reports /> :
      <Jobs />
  )
}
