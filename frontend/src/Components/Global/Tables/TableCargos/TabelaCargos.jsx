import React, { useContext, useEffect, useMemo, useState } from 'react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable'; // Ajuste o caminho para seu MainTable
import { NavigationContext } from '@/Contexts/NavigationContext';
import Columns from './columns.jsx';

export default function TabelaCargos({
    perfis,
    escopo, 
    initialSelectedRoles = [],
    setSelectedRoles = () => {},
    setDisabledPermissions = () => {}
  }){
    const data = useMemo(() => perfis, [perfis]);
    const { navigate } = useContext(NavigationContext);
    const columns = useMemo(() => Columns(
        navigate, setDisabledPermissions), [navigate, setDisabledPermissions]);

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        const initialSelection = {};
        const selectedIdsSet = new Set(initialSelectedRoles.map(String)); // Converte IDs para string para comparação
        data.forEach((item, index) => {
            if (selectedIdsSet.has(String(item.id))) {
                initialSelection[index] = true;
            }
        });
        setRowSelection(initialSelection);
    }, [initialSelectedRoles, data]);

    useEffect(() => {
        const selectedRowIndexes = Object.keys(rowSelection);
        const selectedIds = selectedRowIndexes.map(index => data[index].id);
        setSelectedRoles([...selectedIds]);
    }, [rowSelection, data, setSelectedRoles]);

    return (
        <div className="w-full md:w-md lg:w-lg max-w-full rounded-lg">
            <h5 className='text-xl font-semibold text-black'>Atribuir Perfis {escopo}</h5>
            <MainTable
                data={data}
                columns={columns}
                hasSelectForRows={false}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
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