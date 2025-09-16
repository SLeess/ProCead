import FormattedValue from "./FormmatedValue";

/**
 * Componente que renderiza a tabela de comparação para o evento 'updated'.
 */
export default function UpdateDetails({ properties }){
    const oldData = properties.old || {};
    const newData = properties.attributes || {};
    const allKeys = Array.from(new Set([...Object.keys(oldData), ...Object.keys(newData)]));

    const passwordWasChanged = properties.password_changed === true;

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Campo</th>
                    <th scope="col" className="px-6 py-3">Valor Antigo</th>
                    <th scope="col" className="px-6 py-3">Valor Novo</th>
                </tr>
            </thead>
            <tbody>
                {allKeys.map(key => (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {key}
                        </th>
                        <td className="px-6 py-4 bg-red-50 dark:bg-red-900/20">
                            <FormattedValue value={oldData[key]} />
                        </td>
                        <td className="px-6 py-4 bg-green-50 dark:bg-green-900/20">
                            <FormattedValue value={newData[key]} />
                        </td>
                    </tr>
                ))}
                {passwordWasChanged && (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            password
                        </th>
                        <td colSpan={2} className="px-6 py-4 text-center italic text-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
                            A senha do usuário foi alterada.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};