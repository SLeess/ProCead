import "./Logs.css";
import LoaderDots from "@/Components/Global/LoaderDots/LoaderDots";
import { useAppContext } from "@/Contexts/AppContext";
import AccessDenied from "@/Components/Global/AccessDenied/AccessDenied";
import { useEffect, useState } from "react";
import UserListItem from "./Components/UserListItem";
import LogTimelineItem from "./Components/LogTimelineItem";
import PropertiesModal from "./Components/PropertiesModal";
import { Search } from "lucide-react";
import PaginationControls from "./Components/PaginationControls";
import { DateTimePicker, FormField } from "@/Components/Global/ui/modals";
import { format } from "date-fns";

export default function Logs() {
    
    const { isSuperAdmin, apiAsyncFetch } = useAppContext();
    
    // Estados do painel de USUÁRIOS
    const [users, setUsers] = useState([]);
    const [userMetaData, setUserMetaData] = useState({});
    const [userPagination, setUserPagination] = useState({ pageIndex: 1, pageSize: 5 });
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [debouncedUserSearch, setDebouncedUserSearch] = useState('');
    const [loadingUsers, setLoadingUsers] = useState(true);

    // Estados do painel de LOGS
    const [logs, setLogs] = useState([]);
    const [logMetaData, setLogMetaData] = useState({});
    const [logPagination, setLogPagination] = useState({ pageIndex: 1, pageSize: 10 });
    const [selectedUser, setSelectedUser] = useState(null);
    const [logSearchTerm, setLogSearchTerm] = useState('');
    const [debouncedLogSearch, setDebouncedLogSearch] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [modalLog, setModalLog] = useState(null);

    // Debounce para a busca de usuários
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedUserSearch(userSearchTerm);
            setUserPagination((p) => ({...p, pageIndex: 1}));
        }, 500);
        return () => clearTimeout(timer);
    }, [userSearchTerm]);
    
    // Debounce para a busca de logs
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedLogSearch(logSearchTerm)
            setLogPagination((p) => ({...p, pageIndex: 1}));
        }, 500);
        return () => clearTimeout(timer);
    }, [logSearchTerm]);

    useEffect(() => {
        if (!isSuperAdmin()) return;
        const fetchUsers = async () => {
            setLoadingUsers(true);
            try {
                const params = new URLSearchParams({
                    page: userPagination.pageIndex,
                    per_page: userPagination.pageSize,
                });
                if (debouncedUserSearch) params.append('search', debouncedUserSearch);

                const result = await apiAsyncFetch({ url: `/api/super-admin/users?${params.toString()}` });
                setUsers(result.data.users);
                setUserMetaData(result.data.meta);
            } catch (error) {
                console.error("Falha ao buscar usuários", error);
            } finally {
                setLoadingUsers(false);
            }
        };
        fetchUsers();
    }, [isSuperAdmin, userPagination, debouncedUserSearch]);

    // Efeito para buscar a lista de LOGS
    useEffect(() => {
        if (!isSuperAdmin()) return;
        const fetchLogs = async () => {
            setLoadingLogs(true);
            try {
                const params = new URLSearchParams({
                    page: logPagination.pageIndex,
                    per_page: logPagination.pageSize,
                });
                if (debouncedLogSearch) params.append('search', debouncedLogSearch);
                if (dateRange.start) params.append('start_date', format(new Date(dateRange.start), 'yyyy-dd-MM HH:mm:ss').toString());
                if (dateRange.end) params.append('end_date', format(new Date(dateRange.end), 'yyyy-dd-MM HH:mm:ss').toString());

                const baseUrl = selectedUser ? `/api/super-admin/logs/user/${selectedUser.uuid}` : '/api/super-admin/logs';
                const result = await apiAsyncFetch({ url: `${baseUrl}?${params.toString()}` });

                setLogs(result.data.logs);
                setLogMetaData(result.data.meta);
            } catch (error) {
                console.error("Falha ao buscar logs", error);
            } finally {
                setLoadingLogs(false);
            }
        };
        fetchLogs();
    }, [selectedUser, logPagination, debouncedLogSearch, dateRange]);

    if (!isSuperAdmin()) return <AccessDenied />;

    return (
        <>
            <PropertiesModal 
                isOpen={!!modalLog}
                onClose={() => setModalLog(null)}
                logData={modalLog}
            />
            <section id="gerenciar_logs_globais" className="">
                <header>
                    <h1>Gerenciar Logs</h1>
                </header>
                {/* PAINEL LATERAL ESQUERDO */}
                <aside>
                    
                    <ul className="overflow-y-auto flex-grow">
                        <UserListItem 
                            user={{ nome: 'Todos os Usuários', email: 'Visualizar logs de todo o sistema' }}
                            onClick={() => setSelectedUser(null)}
                            isActive={selectedUser === null}
                        />
                        <div className="p-4 border-b dark:border-gray-700">
                            <h2 className="text-lg font-semibold dark:text-white">Usuários</h2>
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                <input 
                                    type="text" 
                                    placeholder="Pesquisar usuário" 
                                    className="w-full p-2 pl-10 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={userSearchTerm}
                                    onChange={(e) => setUserSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {loadingUsers ? <p className="p-4 text-gray-500">Carregando...</p> : 
                            users.map(user => (
                                <UserListItem 
                                    key={user.uuid} 
                                    user={user}
                                    onClick={() => {
                                        setLogPagination((p) => ({...p, pageIndex: 1}))
                                        setSelectedUser(user);
                                    }}
                                    isActive={selectedUser?.uuid === user.uuid}
                                />
                            ))
                        }
                    </ul>
                    {!loadingUsers && 
                        <PaginationControls className={`flex-col space-y-3 text-xs rounded-2xl`} pagination={userPagination} setPagination={setUserPagination} meta={userMetaData} loading={loadingUsers} />
                    }
                </aside>
                <hr className="border-2 border-[border-gray-700] rounded-xl"/>
                {/* PAINEL DIREITO */}
                <main>
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {selectedUser ? `Logs de: ${selectedUser.nome}` : 'Logs Gerais do Sistema'}
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                            <div className="relative flex-grow">
                                <FormField label="Busca geral por Logs" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                                <Search className="absolute left-3 bottom-0 -translate-y-1/2 text-gray-400" size={20}/>
                                <input 
                                    type="text" 
                                    placeholder="Pesquisar na descrição do log..." 
                                    className="w-full p-2 pl-10 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={logSearchTerm}
                                    onChange={(e) => setLogSearchTerm(e.target.value)}
                                />
                                </FormField>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FormField label="Início em" className="sm:col-span-3 md:col-span-6 xl:col-span-1">
                                    <DateTimePicker 
                                        id={"fim_inscricoes"} 
                                        value={dateRange.start} 
                                        onChange={(e) => setDateRange(d => ({...d, start: e.target.value}))}
                                        placeholder={"00/00/00 00:00:00"} 
                                    ></DateTimePicker>
                                </FormField>
                                <FormField label="Término em" className="sm:col-span-3 md:col-span-6 xl:col-span-1">
                                    <DateTimePicker 
                                        id={"fim_inscricoes"} 
                                        value={dateRange.end} 
                                        onChange={e => setDateRange(d => ({...d, end: e.target.value}))}
                                        placeholder={"00/00/00 00:00:00"} 
                                    ></DateTimePicker>
                                </FormField>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-4">
                        {
                            logs.length === 0 && !loadingLogs && (
                            <div className="text-center py-20">
                                <p className="text-gray-500">Nenhuma atividade encontrada para os filtros selecionados.</p>
                            </div>
                            )
                        }
                        {
                            !loadingLogs && <div className="relative mx-5 h-[480px]">
                                {logs.map((log, index) => (
                                    <LogTimelineItem key={log.id} log={log} onDetailsClick={setModalLog} logsLength={logs.length} index={index}/>
                                ))}
                            </div>
                        }
                        {loadingLogs && <div className="py-4 flex justify-center items-center align-middle"><LoaderDots width={'50px'} height={'50px'}/></div>}
                        
                    </div>
                    {
                        !loadingLogs && 
                        <PaginationControls className={`flex-col md:flex-row space-y-3 md:space-y-0`} pagination={logPagination} setPagination={setLogPagination} meta={logMetaData} loading={loadingLogs} />
                    }
                </main>
            </section>
        </>
    );
}