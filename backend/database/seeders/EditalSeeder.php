<?php

namespace Database\Seeders;

use App\Models\Edital;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class EditalSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $edital1 = Edital::create(['nome' => 'Edital 001/2025', 'descricao' => 'Edital para contratação de desenvolvedores.']);
        $edital2 = Edital::create(['nome' => 'Edital 002/2025', 'descricao' => 'Edital para seleção de estagiários.']);

        $userAdmin = User::create([
            'nome' => 'Admin Edital 1',
            'cpf' => '11111111111',
            'email' => 'admin@edital1.com',
            'password' => Hash::make('password'),
        ]);

        $userCandidato = User::create([
            'nome' => 'Candidato Edital 2',
            'cpf' => '22222222222',
            'email' => 'candidato@edital2.com',
            'password' => Hash::make('password'),
        ]);
        
        $userAmbos = User::create([
            'nome' => 'Admin e Candidato',
            'cpf' => '33333333333',
            'email' => 'ambos@example.com',
            'password' => Hash::make('password'),
        ]);

        $permAdmin1 = "administrar-edital:{$edital1->id}";
        Permission::findOrCreate($permAdmin1, 'web');
        $userAdmin->givePermissionTo($permAdmin1);
        $userAmbos->givePermissionTo($permAdmin1);

        $permInscricao2 = "inscrever-se-edital:{$edital2->id}";
        $permPainel2 = "visualizar-painel-candidato-edital:{$edital2->id}";
        Permission::findOrCreate($permInscricao2, 'web');
        Permission::findOrCreate($permPainel2, 'web');
        $userCandidato->givePermissionTo($permInscricao2);
        $userCandidato->givePermissionTo($permPainel2);
        $userAmbos->givePermissionTo($permInscricao2);
        $userAmbos->givePermissionTo($permPainel2);
    }
}