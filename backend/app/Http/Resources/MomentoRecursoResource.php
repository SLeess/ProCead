<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MomentoRecursoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'description' => $this->descricao,
            'start' => $this->data_inicio->format('d/m/Y H:i:s'),
            'end' => $this->data_fim->format('d/m/Y H:i:s'),
        ];
    }
}
