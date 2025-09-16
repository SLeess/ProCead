/**
* Componente auxiliar para formatar diferentes tipos de valores para exibição.
*/
export default function FormattedValue({ value }){
    if (value === null || value === undefined) {
        return <span className="text-gray-400 italic">N/A</span>;
    }
    if (typeof value === 'boolean') {
        return <span className={`font-mono px-2 py-0.5 rounded text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{value ? 'Sim' : 'Não'}</span>;
    }
    if (typeof value === 'object') {
        return <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>;
    }
    return String(value);
};
