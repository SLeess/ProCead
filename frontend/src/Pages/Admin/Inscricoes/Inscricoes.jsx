import MainTable from '../../../Components/Table/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../Components/AccessDenied';

const Inscricoes = () => {
  const { can, isAdmin } = useContext(AppContext);
  if(can('visualizar-inscricoes') && isAdmin())
    return (
      <>
      <MainTable/>
      </>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Inscricoes