interface Periodo {
  inicio: string;
  fim: string;
}

interface MomentoRecurso {
  descricao: string;
  inicio: string;
  fim: string;
}

interface Datas {
  inscricoes: Periodo;
  alteracao_dados: Periodo;
  resultados: {
    preliminar: string;
    final: string;
  };
  avaliacao_socioeconomica: Periodo;
}

type StatusEdital = 
  | 'Previsto' 
  | 'Inscrições Abertas' 
  | 'Em Avaliação' 
  | 'Em Andamento' 
  | 'Finalizado' 
  | 'Configuração Incompleta';

interface processo {
  id: number;
  referencia: string;
  descricao: string;
  status: StatusEdital;
  
  publico_alvo: string;
  formato_notas: string;
  tipo_inscricao: string;
  configuracao_categorias: string;

  max_itens_inscricao: number;
  max_itens_posse: number;

  permite_remanejamento: boolean;

  datas: Datas;
  momentos_recurso: MomentoRecurso[];

  created_at: string;
  updated_at: string;
}

export interface EditalCardProps {
  processo: processo;
};
