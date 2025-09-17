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

            "avaliacao_socioeconomico" => [
                'inicio' => $this->start_avaliacao_socioeconomico?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_socioeconomico?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_pcd" => [
                'inicio' => $this->start_avaliacao_pcd?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_pcd?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_etnica" => [
                'inicio' => $this->start_avaliacao_etnica?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_etnica?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_junta_medica" => [
                'inicio' => $this->start_avaliacao_junta_medica?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_junta_medica?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_identidade_genero" => [
                'inicio' => $this->start_avaliacao_genero?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_genero?->format('d/m/Y H:i:s'),
            ],
            "avaliacao_heteroidentificacao" => [
                'inicio' => $this->start_avaliacao_hid?->format('d/m/Y H:i:s'),
                'fim' =>  $this->end_avaliacao_hid?->format('d/m/Y H:i:s'),
            ],
        ];
    }
}
