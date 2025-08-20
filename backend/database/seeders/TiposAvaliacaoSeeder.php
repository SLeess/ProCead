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
            TipoAvaliacao::create(['tipo' => 'Socioeconômica']);
            TipoAvaliacao::create(['tipo' => 'Heteroidentificação']);
            TipoAvaliacao::create(['tipo' => 'Junta Médica']);
            TipoAvaliacao::create(['tipo' => 'Étnica']);
            TipoAvaliacao::create(['tipo' => 'Identidade de Gênero'])->time;
            // DB::commit();
        // }catch(Exception $e){
            // DB::rollBack();
        // }
    }
}
