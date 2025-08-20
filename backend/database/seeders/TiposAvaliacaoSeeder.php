<?php

namespace Database\Seeders;

use App\Models\TipoAvaliacao;
use DB;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TiposAvaliacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::beginTransaction();
        // try{
            TipoAvaliacao::create(['tipo' => 'socioeconomico']);
            TipoAvaliacao::create(['tipo' => 'heteroidentificacao']);
            TipoAvaliacao::create(['tipo' => 'junta_medica']);
            TipoAvaliacao::create(['tipo' => 'etnica']);
            TipoAvaliacao::create(['tipo' => 'identidade_genero'])->time;
            // DB::commit();
        // }catch(Exception $e){
            // DB::rollBack();
        // }
    }
}
