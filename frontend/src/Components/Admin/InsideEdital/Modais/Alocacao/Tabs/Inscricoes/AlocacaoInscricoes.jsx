import MainTable from '@/Components/Table/MainTable'
import React from 'react'
import data from './data'
import columns from './columns'

const AlocacaoInscricoes = () => {
    return (
            <MainTable data={data} columns={columns} title={"Inscriçoes"} />
    )
}

export default AlocacaoInscricoes