<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Edital>
 */
class EditalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Arrays com as opções possíveis para os campos do tipo 'enum'
        $publicoAlvoOptions = [
            'ALUNO',
            'PROFESSOR',
            'TUTOR',
            'COORDENADOR_CURSO_GRADUACAO_LICENCIATURA',
            'COORDENADOR_CURSO_GRADUACAO_TECNOLOGO',
            'COORDENADOR_CURSO_POS_GRADUACAO_ESPECIALIZACAO',
            'COORDENADOR_TUTORIA',
            'COORDENADOR_GERAL_UAB',
            'COORDENADOR_ADJUNTO_UAB',
            'ESTAGIARIO',
        ];

        $formatoNotasOptions = ['SOMA_CRITERIOS', 'MEDIA_CRITERIOS', 'ORDEM_DE_INSCRICAO'];
        $tipoInscricaoOptions = ['CURSO', 'CARGO', 'DISCIPLINA', 'GERAL'];
        $categoriasOptions = ['NÃO_POSSUI', 'CATEGORIAS_GERAIS', 'CATEGORIAS_ESPECIFICAS_POR_VAGA'];

        return [
            'referencia' => 'Edital ' . fake()->unique()->numerify('###/'.now()->year),

            'descricao' => fake()->paragraph(2),

            'publico_alvo' => fake()->randomElement($publicoAlvoOptions),
            'formato_notas' => fake()->randomElement($formatoNotasOptions),
            'tipo_inscricao' => fake()->randomElement($tipoInscricaoOptions),
            'categorias' => fake()->randomElement($categoriasOptions),

            'max_itens_inscricao' => fake()->numberBetween(1, 5),
            'max_itens_posse' => fake()->numberBetween(1, 2),

            'remanejamento' => fake()->boolean(),
        ];
    }


//     Warning: 1265 Data truncated for column 'publico_alvo' at row 1 (Connection: mysql, SQL: insert into `editais` (`referencia`, `descri
// cao`, `publico_alvo`, `formato_notas`, `tipo_inscricao`, `categorias`, `max_itens_inscricao`, `max_itens_posse`, `remanejamento`, `updated_at`, `created
// _at`) values ("Edital 253/2025", "Animi explicabo qui ratione corrupti. Quia qui id ut est doloribus dicta itaque sunt. Voluptatem animi error similique do
// lores qui quisquam et.", "COORDENADOR_GERAL_UAB", "MEDIA_CRITERIOS", "CURSO", "CATEGORIAS_GERAIS", 5, 1, 0, "2025-09-02 13:37:41", "2025-09-02 13:37:41"))
}
