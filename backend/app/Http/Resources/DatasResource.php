<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DatasResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'inscricoes' => [
                'inicio' => $this->start_inscricao->format('d/m/Y H:i:s'),
                'fim' => $this->end_inscricao->format('d/m/Y H:i:s'),
            ],
            'alteracao_dados' => [
                'inicio' => $this->start_alteracao_dados->format('d/m/Y H:i:s'),
                'fim' => $this->end_alteracao_dados->format('d/m/Y H:i:s'),
            ],
            'resultados' => [
                'preliminar' => $this->resultado_preliminar->format('d/m/Y H:i:s'),
                'final' => $this->resultado_final->format('d/m/Y H:i:s'),
            ],

            "avaliacao_socioeconomico" => [
                'inicio' => $this->start_avaliacao_socioeconomico?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_socioeconomico?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_pcd" => [
                'inicio' => $this->start_avaliacao_pcd?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_pcd?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_hid" => [
                'inicio' => $this->start_avaliacao_hid?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_hid?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_etnica" => [
                'inicio' => $this->start_avaliacao_etnica?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_etnica?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_genero" => [
                'inicio' => $this->start_avaliacao_genero?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_genero?->format('d/m/Y H:i:s'),
            ],
        ];
    }
}
