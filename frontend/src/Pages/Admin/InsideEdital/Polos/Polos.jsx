import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { Building2, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Table/MainTable';
import PoloCreateModal from '@/Components/Admin/InsideEdital/Modais/Polos/PoloCreateModal';
import { useParams } from 'react-router-dom';

const Polos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-campus', editalId) || isSuperAdmin())
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Polos</h1>
          <PoloCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Polos</p>
            <p className="text-2xl font-bold mb-1">3</p>
            <Building2 className="absolute top-4 right-4 text-gray-500" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Polos"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Polos