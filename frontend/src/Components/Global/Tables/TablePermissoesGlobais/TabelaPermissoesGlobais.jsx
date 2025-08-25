import React, { useEffect, useMemo, useState } from 'react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { TabelaPermissoesGlobaisGlobais } from './columns';

export default function TabelaPermissoesGlobais({
    permissoesGlobais = [],
    setSelectedPerms = () => {},
    hasBeenUpdated,
    initialSelectedPermissions = [],
    disabledInheritPermissions = [],
}) {
    const [data, setData] = useState([]);
    const columns = useMemo(() => TabelaPermissoesGlobaisGlobais(), []);

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
      if (Object.keys(permissoesGlobais).length === 0) {
          setData([]);
          return;
      }

      const selectedIdsSet = new Set(initialSelectedPermissions);
      const disabledIdsSet = new Set(disabledInheritPermissions);
      /**
       * Função auxiliar para criar o objeto de cada permissão.
       * @param {object|null} perm - O objeto de permissão original.
       * @returns {{checked: boolean, disabled: boolean}|null}
       */
      const createPermissionState = (perm) => {
          if (!perm) {
              return null;
          }
          
          const permId = String(perm.id);
          const isDisabled = disabledIdsSet.has(permId);
          return {
              ...perm,
              checked: isDisabled || selectedIdsSet.has(permId),
              disabled: isDisabled
          };
      };

      const formattedData = permissoesGlobais.map(createPermissionState);

      /**
      //  * Opcional -- é uma função pra ordenar os grupos de permissões para exibir em ordem alfabética
      */
      setData(
          formattedData.sort((a,b) => String(a.name).toLowerCase().localeCompare(String(b.name)))
      );
    }, [permissoesGlobais, initialSelectedPermissions, disabledInheritPermissions, hasBeenUpdated]);

    useEffect(() => {
        const initialSelection = {};
        const selectedSet = new Set(initialSelectedPermissions.map(String));
        data.forEach((item, index) => {
            if (selectedSet.has(String(item.id))) {
                initialSelection[index] = true;
            }
        });
        setRowSelection(initialSelection);
    }, [initialSelectedPermissions, data]);

    useEffect(() => {
        const selectedRowIndexes = Object.keys(rowSelection);
        const selectedIds = selectedRowIndexes.map(index => data[index]?.id).filter(Boolean); // Pega os IDs
        
        setSelectedPerms(selectedIds);

    }, [rowSelection, data, setSelectedPerms]);
    return (
        <div className="w-full max-w-full rounded-lg">
            <h5 className='text-xl font-semibold text-black'>Atribuir Permissões Globais</h5>
            <MainTable
                data={data}
                columns={columns}
                // Habilita e conecta a seleção de linhas
                hasSelectForRows={false}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                // --- Outras props ---
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