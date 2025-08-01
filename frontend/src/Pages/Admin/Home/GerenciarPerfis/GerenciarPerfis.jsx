import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import "./GerenciarPerfis.css";
import { UserRoundPen } from "lucide-react";
import data from "./data";
import getColumns from "./columns";
import PerfilCreateModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilCreateModal";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { useContext, useMemo } from "react";

export default function GerenciarPerfis()
{
    const { navigate } = useContext(NavigationContext);

    const columns = useMemo(() => getColumns(navigate), [navigate]);

    return (
        <section id="gerenciar_perfis">
            <header>
                <h1>Gerenciar Perfis</h1>
            </header>
            <div id="content">
                <div className="lg:px-4">
                    <div className="flex items-center justify-between  mb-4">
                        <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
                            <p className="text-gray-600 mb-1">Nº de Perfis</p>
                            <p className="text-2xl font-bold mb-1">1223</p>
                            <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
                        </div>
                            <PerfilCreateModal/>
                    </div>
                    <MainTable data={data} columns={columns} title={"Perfis"}/>
                </div>
            </div>
        </section>
    );
}