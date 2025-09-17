<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditalResumedResource extends JsonResource
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
            'edital' => $this->referencia,
            'descricao' => $this->descricao,

            'status' => $this->calcularStatus($datas),

            'datas' => [
                'inscricoes' => [
                    'inicio' => $this->datas->start_inscricao->format('d/m/Y H:i:s'),
                ],
                'resultados' => [
                    'final' => $this->datas->resultado_final->format('d/m/Y H:i:s'),
                ],
            ],

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
