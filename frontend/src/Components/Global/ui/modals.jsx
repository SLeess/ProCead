import { Calendar, FileText, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IMaskInput } from "react-imask";

const FormField = ({ label, children, className = '', textWrap = true, obrigatorio = false }) => (
    <div className={`flex flex-col ${className}`}>
        <div className="flex items-center">
            <label className={`mb-1 text-sm font-medium text-gray-600 ${textWrap === true ? 'text-wrap' : 'xl:text-nowrap'}`}>{label}</label>
            {obrigatorio ? <span className="text-red-500 ml-1">*</span> : ""}
        </div>
        {children}
    </div>
);

const TextInput = ({ value, readOnly, placeholder, onChange = null, onBlur = null, type = 'text' }) => (
    <input
        type={type}
        defaultValue={value}
        className={`${readOnly !== true ? 'bg-white': 'bg-gray-100'} border border-gray-50 rounded-md px-4 py-2 focus:outline-none w-full`}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
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
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-[42px]">
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

const SelectInput = ({ value, options, readOnly, onChange = null, defaultOption = false}) => (
    <div className="relative">
        <select
            disabled={readOnly}
            value={value}
            onChange={onChange}
            className={`${readOnly !== true ? 'bg-white': 'bg-gray-100'} appearance-none border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full`}
        >
            {defaultOption && <option value="" disabled>Selecione uma opção</option>}
            {options.map(opt => {
                const isObject = typeof opt === 'object' && opt !== null;
                const optionValue = isObject ? opt.value : opt;
                const optionLabel = isObject ? opt.label : opt;
                return <option key={optionValue} value={optionValue}>{optionLabel}</option>
            })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
    </div>
);

const AnexoButton = ({ label, onChange, accept }) => (
    <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
        <label className="w-full">
            <input
                type="file"
                className="hidden"
                onChange={onChange}
                accept={accept}
            />
            <span className="w-full bg-[var(--admin-button)] text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-[var(--admin-button-hover)] cursor-pointer">
                <FileText/>
                <span>Anexo</span>
            </span>
        </label>
    </div>
);

const Checkbox = ({ label, checked, readOnly, onChange = () => {} }) => (
    <label className="flex items-center space-x-2 text-gray-700">
        <input type="checkbox" checked={checked} disabled={readOnly} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span>{label}</span>
    </label>
);

const DateTimeInput = ({ value, placeholder = null, readOnly = false, onChange = null }) => {
    let date;
    if(placeholder === null){
        const currentDate = new Date();
        const year = String(currentDate.getFullYear()).padStart(2,"0");
        const month = String(currentDate.getMonth() + 1).padStart(2,"0");
        const day = String(currentDate.getDate()).padStart(2,"0");
        const hour = String(currentDate.getHours()).padStart(2,"0");
        const minutes = String(currentDate.getMinutes()).padStart(2,"0");
        const seconds = String(currentDate.getSeconds()).padStart(2,"0");
    
        date = String(`${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
    } else{
        date = placeholder;
    }

    return (
    <div className="dateTimeInput relative">
        <IMaskInput
            mask="00/00/0000 00:00:00"
            value={value}
            readOnly={readOnly}
            placeholder={`Ex: ${date}`}
            className={`${readOnly ? 'bg-gray-100' : 'bg-white'} 
                border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full`
            }
            onBlur={(e) => {
                if (onChange) {
                    onChange(e);
                }
            }}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            <Calendar/>
        </div>
    </div>
)};





import Flatpickr from 'react-flatpickr';

import "flatpickr/dist/flatpickr.min.css";
// import "flatpickr/dist/themes/material_blue.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";

/**
 * Aplica uma máscara de data e hora (dd/mm/aaaa hh:mm:ss) a uma string.
 * @param {string} value O valor do input a ser mascarado.
 * @returns {string} O valor com a máscara aplicada.
 */
function maskDateTime(value) {
    // 1. Limpa o valor, mantendo apenas os dígitos.
    const cleaned = value.replace(/\D/g, '');

    // 2. Limita o total de dígitos a 14 (ddmmyyyyhhmmss).
    const limited = cleaned.slice(0, 14);

    // 3. Aplica a máscara progressivamente usando Regex.
    let masked = limited;
    masked = masked.replace(/(\d{2})(\d)/, '$1/$2');          // dd/m
    masked = masked.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');  // dd/mm/y
    masked = masked.replace(/(\d{2}\/\d{2}\/\d{4})(\d)/, '$1 $2');  // dd/mm/yyyy h
    masked = masked.replace(/(\d{2}\/\d{2}\/\d{4} \d{2})(\d)/, '$1:$2'); // ... hh:m
    masked = masked.replace(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})(\d)/, '$1:$2'); // ... hh:mm:s

    return masked;
    // return value.replace(/[^0-9/:\s]/g, '');
}


const DateTimePicker = ({ value, placeholder = null, readOnly = false, onChange = null, id }) => {
    const fp = useRef(null);
    let date;

    if(placeholder === null){
        const currentDate = new Date();
        const year = String(currentDate.getFullYear()).padStart(2,"0");
        const month = String(currentDate.getMonth() + 1).padStart(2,"0");
        const day = String(currentDate.getDate()).padStart(2,"0");
        const hour = String(currentDate.getHours()).padStart(2,"0");
        const minutes = String(currentDate.getMinutes()).padStart(2,"0");
        const seconds = String(currentDate.getSeconds()).padStart(2,"0");
    
        date = String(`${day}/${month}/${year} ${hour}:${minutes}:${seconds}`);
    } else{
        date = placeholder;
    }

    //   https://flatpickr.js.org/examples/
    const options = useMemo(() => ({
        allowInput: true,
        enableTime: true,
        enableSeconds: true,
        time_24hr: true,
        dateFormat: "d/m/Y H:i:S",
        locale: Portuguese,
        minDate: new Date().fp_incr(-365 * 20),
        maxDate: new Date().fp_incr(365 * 10),
        monthSelectorType: "static"
    }), []);

    const [data, setData] = useState(value);

    // Caso clique no X, vai atualizara aqui
    useEffect(() => {
        setData(value);
    }, [value]);

    function handleTyping(selectedDates, dateStr, instance){   
        const maskedValue = maskDateTime(instance.input.value);
        setData(maskedValue);
    }

    return (
    <div className="time-picker flex items-center shadow-sm rounded-md">
        <Flatpickr
            id={id}
            ref={fp}
            mask="00/00/0000 00:00:00"
            maxLength="19"
            value={data}
            readOnly={readOnly}
            placeholder={`Ex: ${date}`}
            className={`${readOnly ? 'bg-gray-100' : 'bg-white'} 
                border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full
                block text-slate-900 placeholder:text-slate-500 focus:ring-inset sm:text-sm rounded-l-md`
            }
            onChange={handleTyping}
            options={options}
            onClose={() => {
                if (onChange) {
                    onChange({ target: { value: data } });
                }
            }}
        />
        <div 
            onClick={
                () => fp.current?.flatpickr.toggle()
            }
            className="border-[1.5px] border-slate-300 flex items-center justify-center px-1.5 py-1.5 text-gray-500 ">
            <Calendar className="w-[18px]"/>
        </div>
        <div 
            onClick={() =>{ 
                if (onChange) {
                    onChange({target : { value: ""}})
                }
            }}
            className="border-[1.5px] border-slate-300 flex items-center justify-center px-1.5 py-1.5 text-gray-500 rounded-r-md">
            <X className="hover:cursor-pointer text-red-700 w-[18px]"/>
        </div>
    </div>
  );
}


const CheckboxMultiSelect = ({ options, value, onChange, placeholder = "Selecione" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const handleSelect = (optionValue) => {
        const newValue = [...value];
        const index = newValue.indexOf(optionValue);
        if (index > -1) {
            newValue.splice(index, 1);
        } else {
            newValue.push(optionValue);
        }
        onChange(newValue);
    };

    const selectedLabels = options
        .filter(opt => value.includes(opt.value))
        .map(opt => opt.label)
        .join(', ');

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                className="bg-white border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedLabels || placeholder}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul>
                        {options.map(opt => (
                            <li key={opt.value} className="px-4 py-2 hover:bg-gray-100">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={value.includes(opt.value)}
                                        onChange={() => handleSelect(opt.value)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>{opt.label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export { FormField, TextInput, SelectInput, AnexoButton, Checkbox, MultiSelectTags, DetailRow, AlterationRow, DateTimeInput, DateTimePicker, CheckboxMultiSelect };