import React from 'react';
import { Eye } from 'lucide-react';
import { format } from 'date-fns'; // Biblioteca para formatar datas
import { ptBR } from 'date-fns/locale'; // Localização para português
import UserShowProfileModal from '@/Components/Admin/InsideEdital/Modais/Usuario/UserShowProfileModal';

const EventPill = ({ event }) => {
    const eventStyles = {
        created: { text: 'Criação', color: 'bg-green-100 text-green-800' },
        updated: { text: 'Atualização', color: 'bg-blue-100 text-blue-800' },
        deleted: { text: 'Exclusão', color: 'bg-red-100 text-red-800' },
        default: { text: event, color: 'bg-gray-100 text-gray-800' },
    };
    const style = eventStyles[event] || eventStyles.default;
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${style.color}`}>
            {style.text}
        </span>
    );
};

/**
 * Define as colunas para a tabela de logs de atividade.
 * @param {function} navigate - Função de navegação.
 * @returns {array} - Um array de definições de coluna para TanStack Table.
 */
export const LogsColumns = (navigate) => [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <span>{row.original.id}</span>,
        columnVisibility: false,
    },
    {
        accessorKey: "event",
        header: "Evento",
        cell: ({ row }) => <EventPill event={row.original.event} />,
    },
    {
        accessorKey: "description",
        header: "Descrição da Atividade",
        cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
    },
    {
        accessorKey: "subject_type",
        header: "Módulo Afetado",
        cell: ({ row }) => {
            // Pega o nome curto da classe do model. Ex: 'App\Models\User' vira 'User'.
            const modelName = row.original.subject_type?.split('\\').pop() || '';
            
            return <p className='text-center w-full'>{modelName}</p>;
        },
    },
    {
        accessorKey: "subject",
        header: "Alvo da Ação",
        cell: ({ row }) => (
          <div className='flex items-center justify-center'>
            {
              row.original.subject && row.original.subject_type?.split('\\').pop() == 'User' &&
              <>
                <span className='mr-2'>{row.original.subject?.nome || row.original.subject?.edital}</span>
                <UserShowProfileModal user={row.original.subject}></UserShowProfileModal>
              </>
            }
            {
              row.original.subject && row.original.subject_type?.split('\\').pop() == 'Edital' &&
              <>
                <span className='mr-2'>Edital N° {row.original.subject?.edital}</span>
              </>
            }
          </div>
        ),
    },
    {
        accessorKey: "causer",
        header: "Autor da Ação",
        cell: ({ row }) => <div className='flex items-center justify-center'>
          <span className='mr-2'>{row.original.causer?.nome || 'Sistema'}</span>
          {
            row.original.causer &&
            <UserShowProfileModal user={row.original?.causer}></UserShowProfileModal>
          }
        </div>,
    },
    {
        accessorKey: "created_at",
        header: "Data",
        cell: ({ row }) => {
            // Formata a data para um formato legível em português.
            // Ex: "04 de Setembro de 2025, 15:30"
            try {
                const date = new Date(row.original.created_at);
                // return <span>{format(date, "dd 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}</span>;
                return <span>{format(date, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR })}</span>;
                // return <span>{date}</span>;
            } catch (error) {
                return <span>Data inválida</span>;
            }
        },
    },
    {
        id: "actions",
        header: "Detalhes", // Mudei de "Ações" para "Detalhes" para mais clareza
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <button 
                    onClick={() => navigate(`admin/logs/${row.original.id}/`)} 
                    className="p-1 hover:bg-gray-200 rounded-full"
                    title="Ver detalhes do log"
                >
                    <Eye className="h-5 w-5 text-blue-500" />
                </button>
            </div>
        ),
        enableSorting: false,
    },
];


export default LogsColumns;