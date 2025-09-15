import "./GerenciarUsuarios.css";
import { useContext, useMemo, useState } from "react";
import { UserRoundPen } from "lucide-react";
import { NavigationContext } from "@/Contexts/NavigationContext";
import GerenciarUsuariosColumns from "./columns";
import UserCreateModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserCreateModal";
import Loader from "@/Components/Global/Loader/Loader";
import AsyncMainTable from "@/Components/Global/Tables/AsyncMainTable/AsyncMainTable";
import LoaderDots from "@/Components/Global/LoaderDots/LoaderDots";
import { useAppContext } from "@/Contexts/AppContext";
import AccessDenied from "@/Components/Global/AccessDenied/AccessDenied";

export default function GerenciarUsuarios(){
    const { isSuperAdmin } = useAppContext();
    const { navigate } = useContext(NavigationContext);

    const columns = useMemo(() => GerenciarUsuariosColumns(navigate), [navigate]);
    const [metaData, setMetaData] = useState({});
    const [rowSelection, setRowSelection] = useState([]);
    
    return(
    <section id="gerenciar_usuarios_global" className={`${!isSuperAdmin() ? 'flex justify-center items-center': ''}`}>
        <header>
            <h1>Gerenciar Usuários</h1>
        </header>
        {
            !isSuperAdmin() &&
            <AccessDenied/>
        }
        {
            isSuperAdmin() &&
            <div id="content">
                <div className="lg:px-4">
                    <>
                        <div className="sm:flex items-center justify-between  mb-4">
                            <div className="bg-white shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
                                <p className="text-gray-600 mb-1">Nº de Usuários</p>
                                    {
                                        !Object.keys(metaData).length ?
                                        // <Loader w={33} h={33}/> 
                                        <LoaderDots width={"33px"} height={"33px"}></LoaderDots>
                                        :
                                        <p className="text-2xl font-bold mb-1">
                                            {metaData?.total}
                                        </p>
                                    }
                                <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
                            </div>
                            <UserCreateModal/>
                        </div>
                        
                        <AsyncMainTable 
                            columns={columns} 
                            title={"Usuários"}

                            serverSideDataUrl="/api/super-admin/users"
                            pageSize={10}
                            // ===================
                            rowSelection={rowSelection}
                            setRowSelection={setRowSelection}
                            // ===================
                            setMetaData={setMetaData}
                        />
                    </>
                </div>
            </div>
        }
    </section>
    );
}