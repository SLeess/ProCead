import React, { useMemo } from 'react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable'; // Ajuste o caminho para seu MainTable
import { TabelaPermissoesGlobaisGlobais } from './columns';
// import { NavigationContext } from '@/Contexts/NavigationContext';

export default function TabelaPermissoesGlobais({permissoesGlobais}) {
  const data = useMemo(() => permissoesGlobais, [permissoesGlobais]);

  // const { navigate } = useContext(NavigationContext);

  const columns = useMemo(() => TabelaPermissoesGlobaisGlobais());
  
  return (
    <div className="w-full md:w-md lg:w-lg  max-w-full rounded-lg">
        <h5 className='text-xl font-semibold text-black'>Atribuir Permissões Globais</h5>
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