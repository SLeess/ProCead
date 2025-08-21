<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {
            $this->call(UserSeeder::class);
            $this->call(PermissionsSeeder::class);
            $this->call(EditalSeeder::class);
            $this->call(TiposAvaliacaoSeeder::class);
            $this->call(PoloSeeder::class);
            $this->call(ModalidadeSeeder::class);
            $this->call(CursoSeeder::class);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e->getMessage(), $e->getTraceAsString());
        }
    }
}
