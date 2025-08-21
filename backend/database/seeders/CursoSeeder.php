<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\Edital;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Curso::create([
            'nome' => 'Licenciatura em Matemática',
            'edital_id' => Edital::first()->id
        ]);
        Curso::create([
            'nome' => 'Licenciatura em Física',
            'edital_id' => Edital::first()->id
        ]);
        Curso::create([
            'nome' => 'Licenciatura em Química',
            'edital_id' => Edital::first()->id
        ]);
    }
}
