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

        // $edital1 = Edital::create(['nome_edital' => '01/2025', 'descricao' => 'Edital para contratação de desenvolvedores.']);
        $edital1 = Edital::create(
            array(
                "id" => 1,
                "referencia" => "04/2025",
                "descricao" => "Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes –",
                "publico_alvo" => "ALUNO",
                "formato_notas" => "SOMA_CRITERIOS",
                "tipo_inscricao" => "CURSO",
                "max_itens_inscricao" => 3,
                "max_itens_posse" => 1,
                "remanejamento" => 1,
                "categorias" => "NÃO_POSSUI",
                "created_at" => "2025-08-12 14:13:12",
                "updated_at" => "2025-08-12 14:13:13",
            ),
        );
        // $edital2 = Edital::create(['nome_edital' => '02/2025', 'descricao' => 'Edital para seleção de estagiários.']);


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

        // $permAdmin1 = "administrar-edital:{$edital1->id}";
        // Permission::Create(["name" => $permAdmin1, "guard_name" => 'local']);
        // $userAdmin->givePermissionTo($permAdmin1);
        // $userAmbos->givePermissionTo($permAdmin1);

        // $permInscricao2 = "inscrever-se-edital:{$edital2->id}";
        // $permPainel2 = "visualizar-painel-candidato-edital:{$edital2->id}";
        // Permission::Create(["name" => $permInscricao2, "guard_name" => 'local']);
        // Permission::Create(["name" => $permPainel2, "guard_name" => 'local']);
        // $userCandidato->givePermissionTo($permInscricao2);
        // $userCandidato->givePermissionTo($permPainel2);
        // $userAmbos->givePermissionTo($permInscricao2);
        // $userAmbos->givePermissionTo($permPainel2);
    }
}
