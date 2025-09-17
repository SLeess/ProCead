<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\DatasResource;
use App\Http\Resources\MomentoRecursoResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $datas = $this->whenLoaded('datas');
        return [
            'id' => $this->id,
            'referencia' => $this->referencia,
            'descricao' => $this->descricao,

            'status' => $this->calcularStatus($datas),

            'publico_alvo' => $this->publico_alvo->getLabel(),
            'formato_notas' => $this->formato_notas->getLabel(),
            'tipo_inscricao' => $this->tipo_inscricao->getLabel(),
            'configuracao_categorias' => $this->categorias->getLabel(),

            'max_itens_inscricao' => $this->max_itens_inscricao,
            'max_itens_posse' => $this->max_itens_posse,
            'permite_remanejamento' => (bool) $this->remanejamento,

            'datas' => new DatasResource($datas),

            'momentos_recurso' => MomentoRecursoResource::collection($this->whenLoaded('momentosRecurso')),

            'created_at' => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at' => $this->updated_at->format('d/m/Y H:i:s'),
        ];
    }

    /**
     * Calcula o status do edital com base nas datas.
     *
     * @param mixed $datas
     * @return string
     */
    private function calcularStatus($datas): string
    {
        if (!$datas || !$datas->start_inscricao) {
            return 'Configuração Incompleta';
        }

        $agora = Carbon::now();

        return match (true) {
            $agora->isBefore($datas->start_inscricao) => 'Previsto',
            $agora->between($datas->start_inscricao, $datas->end_inscricao) => 'Inscrições Abertas',
            $agora->isAfter($datas->end_inscricao) && $agora->isBefore($datas->resultado_final) => 'Em Avaliação',
            $agora->isAfter($datas->resultado_final) => 'Finalizado',
            default => 'Em Andamento',
        };
    }
}
