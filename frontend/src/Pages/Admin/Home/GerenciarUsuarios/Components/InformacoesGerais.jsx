import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";

export default function InformacoesGerais({user})
{
    return (<>
        <h2>Informações Gerais do Usuário</h2>
        <div className="grid grid-cols-12 sm:mt-3">
            <FormField label="Nome" className="mt-3 sm:mt-0 sm:mr-4">
                <TextInput value={user.nome} readOnly={true}/>
            </FormField>
            <FormField label="Email" className="mt-3 sm:mt-0">
                <TextInput value={user.email} readOnly={true}/>
            </FormField>
        </div>
        <hr className="my-7"/>
    </>);
}