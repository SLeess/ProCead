import { FormField, TextInput } from "@/Components/Global/ui/modals";

export default function InformacoesGeraisComEditall({user, edital})
{
    return (<>
        <h2 className="mb-2">Informações Gerais do Usuário e do Edital</h2>
        <aside className="container m-auto grid grid-cols-1 sm:grid-cols-12 gap-2">
            <FormField label="Nome" className="sm:col-span-8 md:col-span-4 xl:col-span-3">
                <TextInput value={user?.nome} readOnly={true}/>
            </FormField>

            <FormField label="Email" className="sm:col-span-8 sm:row-start-2 md:col-span-4 md:row-start-1 xl:col-span-3">
                <TextInput value={user?.email} readOnly={true}/>
            </FormField>

            <FormField label="Edital" className="sm:col-start-10 sm:col-end-13 md:col-start-11 md:col-end-13 xl:col-start-11 xl:col-end-13 xl:pl-0">
                <TextInput value={edital?.edital} readOnly={true}/>
            </FormField>
        </aside>
        <hr className="my-7"/>
    </>);
}