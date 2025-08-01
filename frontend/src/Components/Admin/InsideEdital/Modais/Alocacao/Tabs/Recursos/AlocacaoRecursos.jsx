import React from 'react'
import data from './data'
import columns from './columns'
import MainTable from '@/Components/Global/Tables/MainTable/MainTable'

const AlocacaoRecursos = () => {
  return (
    <MainTable data={data} columns={columns} title={"Recursos"} />
  )
}

export default AlocacaoRecursos