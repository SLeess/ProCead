import { useState } from "react";

const FormField = ({ label, children, className = '' }) => (
    <div className={`flex flex-col ${className}`}>
        <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>
        {children}
    </div>
);

const TextInput = ({ value, readOnly, placeholder }) => (
    <input
        type="text"
        defaultValue={value}
        className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        readOnly={readOnly}
        placeholder={placeholder}
    />
);

const DetailRow = ({ field, value, isHeader = false }) => (
    <div className={`flex px-6 py-3 ${isHeader ? 'bg-blue-50' : ''}`}>
        <div className="w-1/2 font-medium text-sm text-gray-800">{field}</div>
        <div className="w-1/2 text-sm text-gray-600">{value}</div>
    </div>
);

const AlterationRow = ({ attribute, oldValue, newValue, isHeader = false }) => (
    <div className={`flex px-6 py-3 ${isHeader ? 'bg-blue-50' : ''}`}>
        <div className="w-1/3 font-medium text-sm text-gray-800">{attribute}</div>
        <div className="w-1/3 text-sm text-gray-600">{oldValue}</div>
        <div className="w-1/3 text-sm text-gray-600">{newValue}</div>
    </div>
);

const MultiSelectTags = () => {
    const [selectedItems, setSelectedItems] = useState(['Edital 1', 'Edital 2']);

    const removeItem = (itemToRemove) => {
        setSelectedItems(selectedItems.filter(item => item !== itemToRemove));
    };

    return (
        <div className="relative w-full">
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg min-h-[42px]">
                {selectedItems.map(item => (
                    <div key={item} className="flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-md">
                        <span>{item}</span>
                        <button onClick={() => removeItem(item)} className="ml-2 text-gray-500 hover:text-gray-800">
                            &times;
                        </button>
                    </div>
                ))}
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
    );
};

const SelectInput = ({ value, options, readOnly }) => (
    <div className="relative">
        <select
            disabled={readOnly}
            defaultValue={value}
            className="appearance-none bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
    </div>
);

const AnexoButton = ({ label }) => (
    <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
        <button className="w-full bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Anexo</span>
        </button>
    </div>
);

const Checkbox = ({ label, checked, readOnly }) => (
    <label className="flex items-center space-x-2 text-gray-700">
        <input type="checkbox" checked={checked} disabled={readOnly} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span>{label}</span>
    </label>
);


export { FormField, TextInput, SelectInput, AnexoButton, Checkbox, MultiSelectTags, DetailRow, AlterationRow };