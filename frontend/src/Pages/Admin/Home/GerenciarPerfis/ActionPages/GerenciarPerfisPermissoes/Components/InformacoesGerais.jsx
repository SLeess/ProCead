import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";

export default function InformacoesGerais({role, setPerfil})
{
    return (<>
        <h2>Informações Gerais</h2>
        <div className="grid grid-cols-12 sm:mt-3">
            <FormField label="Nome do Perfil" className="mt-3 sm:mt-0 sm:mr-4">
                <TextInput value={role.nome} onChange={(e) => setPerfil((p) => ({...p, nome: e.target.value}))} readOnly={false}/>
            </FormField>
            <FormField label="Escopo do Perfil" className="mt-3 sm:mt-0">
                <SelectInput value={() => {
                        if(role.escopo == 'local')
                            return 'Perfil Local';
                        else
                            'Perfil Global';
                    }} 
                    onChange={(e) => {
                        if(e.target.value == 'Perfil Local')
                            return setPerfil((p) => ({...p, escopo: "local"}));
                        else
                            return setPerfil((p) => ({...p, escopo: "global"}));
                    }}
                    readOnly={false} 
                    options={['Perfil Local', 'Perfil Global']} 
                />
            </FormField>
        </div>
        <hr className="my-7"/>
    </>);
}