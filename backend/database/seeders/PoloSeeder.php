<?php

namespace Database\Seeders;

use App\Models\Edital;
use App\Models\Polo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PoloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Polo::create([
            'nome' => 'Montes Claros',
            'edital_id' => Edital::first()->id
        ]);
        Polo::create([
            'nome' => 'Bocaiúva',
            'edital_id' => Edital::first()->id
        ]);
        Polo::create([
            'nome' => 'Felício dos Santos',
            'edital_id' => Edital::first()->id
        ]);
    }
}
