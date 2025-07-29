import MainTable from '@/Components/Table/MainTable'
import React from 'react'
import data from './data'
import columns from './columns'

const AlocacaoCotas = () => {
    return (
        <MainTable data={data} columns={columns} title={"Cotas"} />
    )
}

export default AlocacaoCotas