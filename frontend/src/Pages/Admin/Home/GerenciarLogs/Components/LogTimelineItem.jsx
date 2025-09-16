import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Info, LogIn, Pencil, PlusCircle, Trash2 } from 'lucide-react';

/**
 * Item da timeline de logs, agora com ícones e cores dinâmicas.
 */
export default function LogTimelineItem ({ log, onDetailsClick, logsLength, index }){
    const eventConfig = {
        created: { icon: <PlusCircle size={14} />, color: 'bg-green-500' },
        updated: { icon: <Pencil size={14} />, color: 'bg-blue-500' },
        deleted: { icon: <Trash2 size={14} />, color: 'bg-red-500' },
        Login:   { icon: <LogIn size={14} />, color: 'bg-purple-500' },
    };
    
    const config = eventConfig[log.event] || { icon: <Info size={14}/>, color: 'bg-gray-500' };

    return (
        <div className={`${index !== logsLength - 1 ? ' border-l border-gray-400' : '' } relative pl-8 pb-8 dark:border-gray-700`}>
            <div className={`absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full ring-4 ring-white dark:ring-gray-900 flex items-center justify-center text-white ${config.color}`}>
                {config.icon}
            </div>
            
            <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                {format(new Date(log.created_at), "dd 'de' MMMM, HH:mm:ss", { locale: ptBR })}
            </time>
            
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{log.description}</h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
                Autor: <span className="font-medium">{log.causer?.nome || 'Sistema'}</span>
            </p>

            {log.properties && Object.keys(log.properties).length > 0 && (
                <button 
                    onClick={() => onDetailsClick(log)}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                >
                    Ver detalhes
                </button>
            )}
        </div>
    );
};