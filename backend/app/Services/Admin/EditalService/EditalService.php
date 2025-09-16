<?php

namespace App\Services\Admin\EditalService;

use App\Enums\Editais\EditalCategorias;
use App\Enums\Editais\EditalFormatoNotas;
use App\Enums\Editais\EditalPublicoAlvo;
use App\Enums\Editais\EditalTipoInscricao;
use App\Models\Edital;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class EditalService implements \App\Interfaces\Admin\EditalService\IEditalService
{

    public function createEdital(array $data): Edital
    {
        $enumMaps = [
            'publico_alvo' => EditalPublicoAlvo::toEnumMapArray(),
            'formato_notas' => EditalFormatoNotas::toEnumMapArray(),
            'tipo_inscricao' => EditalTipoInscricao::toEnumMapArray(),
            'categorias' => EditalCategorias::toEnumMapArray(),
        ];

        return DB::transaction(function () use ($data, $enumMaps) {

            // 1. Criar o Edital principal
            $edital = Edital::create([
                'referencia' => $data['referencia'],
                'descricao' => $data['descricao'],
                'publico_alvo' => $this->mapEnumValue('publico_alvo', $data['publico_alvo'], $enumMaps),
                'formato_notas' => $this->mapEnumValue('formato_notas', $data['formato_notas'], $enumMaps),
                'tipo_inscricao' => $this->mapEnumValue('tipo_inscricao', $data['tipo_inscricao'], $enumMaps),
                'categorias' => $this->mapEnumValue('categorias', $data['has_categorias'], $enumMaps),
                'max_itens_inscricao' => $data['max_itens_inscricao'],
                'max_itens_posse' => $data['max_itens_posse'],
                'remanejamento' => isset($data['remanejamento']) && $data['remanejamento'] !== '' && $data['remanejamento'] !== false,
            ]);

            // 2. Criar o registro de Datas associado
            $edital->datas()->create([
                'start_inscricao' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_inscricoes']),
                'end_inscricao' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_inscricoes']),
                'start_alteracao_dados' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_alteracao_dados']),
                'end_alteracao_dados' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_alteracao_dados']),
                'resultado_preliminar' => Carbon::createFromFormat('d/m/Y H:i:s', $data['resultado_preliminar_geral']),
                'resultado_final' => Carbon::createFromFormat('d/m/Y H:i:s', $data['resultado_final']),
                'start_avaliacao_socioeconomico' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_avaliacao_socioeconomico']),
                'end_avaliacao_socioeconomico' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_avaliacao_socioeconomico']),
                'start_avaliacao_pcd' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_avaliacao_junta_medica']),
                'end_avaliacao_pcd' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_avaliacao_junta_medica']),
                'start_avaliacao_hid' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_avaliacao_heteroidentificacao']),
                'end_avaliacao_hid' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_avaliacao_heteroidentificacao']),
                'start_avaliacao_etnica' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_avaliacao_etnica']),
                'end_avaliacao_etnica' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_avaliacao_etnica']),
                'start_avaliacao_genero' => Carbon::createFromFormat('d/m/Y H:i:s', $data['inicio_avaliacao_identidade_genero']),
                'end_avaliacao_genero' => Carbon::createFromFormat('d/m/Y H:i:s', $data['fim_avaliacao_identidade_genero']),
            ]);

            // 3. Criar os Momentos de Recurso
            $momentos = [];
            foreach ($data['momentosDeRecursos'] as $momento) {
                $momentos[] = [
                    'descricao' => $momento['description'],
                    'data_inicio' => Carbon::createFromFormat('d/m/Y H:i:s', $momento['start']),
                    'data_fim' => Carbon::createFromFormat('d/m/Y H:i:s', $momento['end']),
                ];
            }
            $edital->momentosRecurso()->createMany($momentos);

            return $edital;
        });
    }

    private function mapEnumValue(string $field, string $value, array $maps): string
    {
        if (!isset($maps[$field][$value])) {
            throw new InvalidArgumentException("Valor inválido '{$value}' para o campo {$field}.");
        }
        return $maps[$field][$value];
    }

}
