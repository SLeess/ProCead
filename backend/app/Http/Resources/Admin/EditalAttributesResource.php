<?php

namespace App\Http\Resources\Admin;

use App\Enums\Editais\EditalCategorias;
use App\Enums\Editais\EditalFormatoNotas;
use App\Enums\Editais\EditalPublicoAlvo;
use App\Enums\Editais\EditalTipoInscricao;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditalAttributesResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "publico_alvo" => EditalPublicoAlvo::toLabelsArray(),
            "categorias" => EditalCategorias::toLabelsArray(),
            'formato_notas' => EditalFormatoNotas::toLabelsArray(),
            'tipo_inscricao' => EditalTipoInscricao::toLabelsArray(),
        ];
    }
}
