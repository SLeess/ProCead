import React, { useContext } from 'react'
import data from './data'
import columns from './columns'
import MainTable from '@/Components/Table/MainTable'
import { AppContext } from '@/Contexts/AppContext'
import { useParams } from 'react-router-dom'
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied'

const Logs = () => {
    const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);
    const { editalId } = useParams();
    if (hasPermissionForEdital('visualizar-logs-do-sistema', editalId) || isSuperAdmin())
        return (
            <>
                <div className="p4">
                    <h1 className="text-2xl font-bold mb-4">Logs do Sistema</h1>
                    <MainTable data={data} columns={columns} title={"Logs"} />
                </div>
            </>
        )
    else return (
        <AccessDenied />
    );
}

export default Logs