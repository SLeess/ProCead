<?php

namespace App\Http\Requests;

use App\Enums\Editais\EditalCategorias;
use App\Enums\Editais\EditalFormatoNotas;
use App\Enums\Editais\EditalPublicoAlvo;
use App\Enums\Editais\EditalTipoInscricao;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEditalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->hasPermissionTo('cadastrar-edital', 'api');
    }

    public function rules(): array
    {
        return [
            'referencia' => 'required|string|max:255|unique:editais,referencia',
            'descricao' => 'required|string|max:255',
            'publico_alvo' => [
                'required',
                'string',
                Rule::in(EditalPublicoAlvo::toLabelsArray())
            ],
            'formato_notas' => [
                'required',
                'string',
                Rule::in(EditalFormatoNotas::toLabelsArray())
            ],
            'tipo_inscricao' => [
                'required',
                'string',
                Rule::in(EditalTipoInscricao::toLabelsArray())
            ],
            'max_itens_inscricao' => 'required|integer|min:1',
            'max_itens_posse' => 'required|integer|min:1',
            'remanejamento' => 'nullable',

            'has_categorias' => [
                'required','string', Rule::in(EditalCategorias::toLabelsArray())
            ],

            // Datas principais
            'inicio_inscricoes' => 'required|date_format:d/m/Y H:i:s',
            'fim_inscricoes' => 'required|date_format:d/m/Y H:i:s|after:inicio_inscricoes',
            'inicio_alteracao_dados' => 'required|date_format:d/m/Y H:i:s',
            'fim_alteracao_dados' => 'required|date_format:d/m/Y H:i:s|after:inicio_alteracao_dados',

            // Datas de avaliação
            'inicio_avaliacao_socioeconomico' => 'required|date_format:d/m/Y H:i:s',
            'fim_avaliacao_socioeconomico' => 'required|date_format:d/m/Y H:i:s|after:inicio_avaliacao_socioeconomico',
            'inicio_avaliacao_junta_medica' => 'required|date_format:d/m/Y H:i:s',
            'fim_avaliacao_junta_medica' => 'required|date_format:d/m/Y H:i:s|after:inicio_avaliacao_junta_medica',
            'inicio_avaliacao_heteroidentificacao' => 'required|date_format:d/m/Y H:i:s',
            'fim_avaliacao_heteroidentificacao' => 'required|date_format:d/m/Y H:i:s|after:inicio_avaliacao_heteroidentificacao',
            'inicio_avaliacao_etnica' => 'required|date_format:d/m/Y H:i:s',
            'fim_avaliacao_etnica' => 'required|date_format:d/m/Y H:i:s|after:inicio_avaliacao_etnica',
            'inicio_avaliacao_identidade_genero' => 'required|date_format:d/m/Y H:i:s',
            'fim_avaliacao_identidade_genero' => 'required|date_format:d/m/Y H:i:s|after:inicio_avaliacao_identidade_genero',

            // Momentos de recurso
            'momentosDeRecursos' => 'required|array|min:0',
            'momentosDeRecursos.*.description' => 'required|string|max:255',
            'momentosDeRecursos.*.start' => 'required|date_format:d/m/Y H:i:s',
            'momentosDeRecursos.*.end' => 'required|date_format:d/m/Y H:i:s|after:momentosDeRecursos.*.start',

            // Resultados
            'resultado_preliminar_geral' => 'required|date_format:d/m/Y H:i:s',
            'resultado_final' => 'required|date_format:d/m/Y H:i:s|after:resultado_preliminar_geral',
        ];
    }
}
