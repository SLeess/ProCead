/**
 * Componente que renderiza uma tabela simples para eventos 'created' ou outros.
 */

import FormattedValue from "./FormmatedValue";

export default function SimpleDetails({ properties, eventType }){
    // Para 'deleted', os dados geralmente estão em 'old'. Para 'created', em 'attributes'.
    const data = eventType === 'deleted' ? properties.old : properties.attributes;
    
    const displayData = properties.password_changed ? properties.attributes : data;
    
    if (!displayData || Object.keys(displayData).length === 0) {
        if (properties.password_changed) {
            return (
                 <table className="w-full text-sm text-left ...">
                    
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                           <th scope="row" className="px-6 py-4 ...">password</th>
                           <td className="px-6 py-4 italic text-yellow-800 ...">A senha foi definida/alterada.</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        return <p className="p-4 text-gray-500">Nenhum atributo detalhado para exibir.</p>;
    }

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Campo</th>
                    <th scope="col" className="px-6 py-3">Valor</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(displayData).map(([key, value]) => {
                    // Nunca exiba o valor do hash da senha
                    if (key === 'password') return null; 
                    return (
                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {key}
                            </th>
                            <td className="px-6 py-4">
                                <FormattedValue value={value} />
                            </td>
                        </tr>
                    );
                })}
                {properties.password_changed && (
                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 ...">password</th>
                        <td className="px-6 py-4 italic text-yellow-800 ...">A senha foi definida/alterada.</td>
                     </tr>
                )}
            </tbody>
        </table>
    );
};