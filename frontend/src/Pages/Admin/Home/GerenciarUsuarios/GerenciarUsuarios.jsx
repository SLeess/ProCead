import { TextInput } from "flowbite-react";
import "./GerenciarUsuarios.css";
import { FormField, SelectInput } from "@/Components/Global/ui/modals";
import { useContext, useEffect, useMemo, useState } from "react";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import PerfilCreateModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilCreateModal";
import { UserRoundPen } from "lucide-react";
import { NavigationContext } from "@/Contexts/NavigationContext";
import GerenciarUsuariosColumns from "./columns";
import UserCreateModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserCreateModal";
import Loader from "@/Components/Global/Loader/Loader";

export default function GerenciarUsuarios(){
    const { navigate } = useContext(NavigationContext);

    const columns = useMemo(() => GerenciarUsuariosColumns(navigate), [navigate]);
    const [metaData, setMetaData] = useState({});
    
    return(
    <section id="gerenciar_usuarios_global">
        <header>
            <h1>Gerenciar Usuários</h1>
        </header>
        <div id="content">
            <div className="lg:px-4">
                <>
                    <div className="sm:flex items-center justify-between  mb-4">
                        <div className="bg-white shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
                            <p className="text-gray-600 mb-1">Nº de Usuários</p>
                            <p className="text-2xl font-bold mb-1">
                                {
                                    !Object.keys(metaData).length ?
                                    <Loader w={33} h={33}/> :
                                    metaData?.total
                                }
                            </p>
                            <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
                        </div>
                        <UserCreateModal/>
                    </div>
                    
                    <MainTable 
                    //  clientSideData={data}
                        columns={columns} 
                        title={"Usuários"}

                        serverSideDataUrl="/api/super-admin/users"
                        pageSize={15}
                        
                        setMetaData={setMetaData}
                    />
                </>
            </div>
        </div>
    </section>
    );
}