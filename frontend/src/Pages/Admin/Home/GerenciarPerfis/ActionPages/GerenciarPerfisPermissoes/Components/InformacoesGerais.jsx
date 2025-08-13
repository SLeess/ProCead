import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useMemo } from "react";

export default function InformacoesGerais({role, setRole})
{
    const selectedScopeLabel = useMemo(() => {
        if (role.escopo === 'local') {
            return 'Perfil Local';
        }
        if (role.escopo === 'global') {
            return 'Perfil Global';
        }
        return '';
    }, [role.escopo]);

    const handleScopeChange = (e) => {
        const selectedLabel = e.target.value;
        const newScopeValue = selectedLabel === 'Perfil Local' ? 'local' : 'global';
        setRole((prevRole) => ({ ...prevRole, escopo: newScopeValue }));
    };

    return (<>
        <h2>Informações Gerais</h2>
        <div className="grid grid-cols-12 sm:mt-3">
            <FormField label="Nome do Perfil" className="mt-3 sm:mt-0 sm:mr-4">
                <TextInput value={role.nome} onChange={(e) => setRole((p) => ({...p, nome: e.target.value}))} readOnly={false}/>
            </FormField>
            <FormField label="Escopo do Perfil" className="mt-3 sm:mt-0">
                <SelectInput
                    value={selectedScopeLabel}
                    onChange={handleScopeChange}
                    readOnly={false}
                    options={['Perfil Local', 'Perfil Global']}
                />
            </FormField>
        </div>
        <hr className="my-7"/>
    </>);
}