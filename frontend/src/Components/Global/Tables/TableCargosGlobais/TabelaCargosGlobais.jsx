import React, { useContext, useMemo } from 'react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable'; // Ajuste o caminho para seu MainTable
import { TabelaPerfisGlobaisColumns } from './columns';
import { NavigationContext } from '@/Contexts/NavigationContext';

export default function TabelaCargosGlobais({perfisGlobais}) {
  const data = useMemo(() => perfisGlobais, [perfisGlobais]);

  const { navigate } = useContext(NavigationContext);

  const columns = useMemo(() => TabelaPerfisGlobaisColumns(navigate), [navigate]);
  
  return (
    <div className="w-full md:w-md lg:w-lg max-w-full rounded-lg">
        <h2>Atribuir Perfis Globais</h2>
        {/* <h3>As permissões atribuídas aos usuários através dos perfis globais valem independentemente do edital acessado.</h3> */}
        <MainTable
            data={data}
            columns={columns}
            hasSelectForRows={false}
            hasCountSelectedLines={false}
            canExport={false}
            hasPaddingStyle={false}
            hasShadowBorderStyle={false}
            canHiddenColumns={false}
            enableDataFooter={false}
            className='border-0'
        />
    </div>
  );
}