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
        $curso = Curso::create([
            'nome' => 'Licenciatura em Matemática',
            'edital_id' => Edital::first()->id
        ]);
        $curso->vagas()->create([
            'vagable_id' => $curso->id,
            'vagable_type' => Curso::class,
        ]);
        $curso = Curso::create([
            'nome' => 'Licenciatura em Física',
            'edital_id' => Edital::first()->id
        ]);
        $curso->vagas()->create([
            'vagable_id' => $curso->id,
            'vagable_type' => Curso::class,
        ]);
        $curso = Curso::create([
            'nome' => 'Licenciatura em Química',
            'edital_id' => Edital::first()->id
        ]);
        $curso->vagas()->create([
            'vagable_id' => $curso->id,
            'vagable_type' => Curso::class,
        ]);
    }
}
