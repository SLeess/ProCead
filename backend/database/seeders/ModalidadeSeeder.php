<?php

namespace Database\Seeders;

use App\Models\Edital;
use App\Models\Modalidade;
use App\Models\ModalidadeTipoAvaliacao;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModalidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Modalidade::create([
            'descricao' => 'Negro Egresso de Escola Pública',
            'edital_id' => Edital::first()->id,
            'sigla' => 'NEEP'
        ]);
        ModalidadeTipoAvaliacao::create(["modalidade_id" => 1, "tipo_avaliacao_id" => 1]);
        ModalidadeTipoAvaliacao::create(["modalidade_id" => 1, "tipo_avaliacao_id" => 2]);
        Modalidade::create([
            'descricao' => 'Pessoa com Deficiência',
            'edital_id' => Edital::first()->id,
            'sigla' => 'PCD'
        ]);
        ModalidadeTipoAvaliacao::create(["modalidade_id" => 2, "tipo_avaliacao_id" => 3]);
        Modalidade::create([
            'descricao' => 'Transsexual e Travesti',
            'edital_id' => Edital::first()->id,
            'sigla' => 'TRANS'
        ]);
        ModalidadeTipoAvaliacao::create(["modalidade_id" => 3, "tipo_avaliacao_id" => 5]);

    }
}
