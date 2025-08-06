<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[
            \Spatie\Permission\PermissionRegistrar::class
        ]->forgetCachedPermissions();

        // create permissions
        $arrayOfLocalPermissionNames = [
            "visualizar-relatorios" => " Visualizar todos os relatórios a respeito das inscrições.",
            "visualizar-inscricoes" => " Visualizar todas as inscrições, status de pagamento e dados pessoais relacionados a mesma.",
            "editar-inscricoes" => " Editar as inscrições e status de pagamento.",
            "visualizar-campi-cursos" => " Visualizar todos os cursos com seus respectivos campus.",
            "cadastrar-campi-cursos" => " Cadastrar os cursos com seus respectivos campus.",
            "editar-campi-cursos" => " Editar os cursos com seus respectivos campus.",
            "deletar-campi-cursos" => " Deletar os cursos com seus respectivos campus.",
            "visualizar-local-de-prova" => " Visualizar todos os locais de provas.",
            "cadastrar-local-de-prova" => " Cadastrar os locais de provas.",
            "editar-local-de-prova" => " Editar os locais de provas.",
            "deletar-local-de-prova" => " Deletar os locais de provas.",
            "visualizar-configuracoes" => " Visualizar todas as configurações do sistema.",
            "cadastrar-configuracoes" => " Cadastrar as configurações do sistema.",
            "editar-configuracoes" => " Editar as configurações do sistema.",
            "visualizar-logs-do-sistema" => " Visualizar todos os logs do sistema envolvendo alterações de dados.",
            "visualizar-usuarios" => " Visualizar todos os usuários do sistema.",
            "editar-usuarios" => " Editar os usuários do sistema.",
            "visualizar-administradores" => " Visualizar todos os administradores do sistema.",
            "cadastrar-administradores" => " Cadastrar os administradores do sistema.",
            "editar-administradores" => " Editar os administradores do sistema.",
            "deletar-administradores" => " Deletar os administradores do sistema.",
            "visualizar-perfis" => " Visualizar todos os Perfis do sistema.",
            "cadastrar-perfis" => " Cadastrar os Perfis do sistema.",
            "editar-perfis" => " Editar os Perfis do sistema.",
            "deletar-perfis" => " Deletar os Perfis do sistema.",
            "visualizar-e-alterar-permissoes-do-perfil" => " Visualizar e alterar permissões de cada perfil separadamente.",
            "visualizar-permissoes" => " Visualizar todos as permissões do sistema.",
            "importar" => " Realizar importações no sistema.",
            "visualizar-campus" => " Visualizar todos os campi do sistema.",
            "cadastrar-campus" => " Cadastrar os campi do sistema.",
            "editar-campus" => " Editar os campi do sistema.",
            "deletar-campus" => " Deletar os campi do sistema.",
            "visualizar-cursos" => " Visualizar todos os cursos do sistema.",
            "cadastrar-cursos" => " Cadastrar os cursos do sistema.",
            "editar-cursos" => " Editar os cursos do sistema.",
            "deletar-cursos" => " Deletar os cursos do sistema.",
            "visualizar-situacoes" => " Visualizar as situações de inscrição do sistema.",
            "editar-situacoes" => " Editar as situações de inscrição do sistema.",
            "visualizar-recursos" => " Visualizar os recursos de inscrição do sistema.",
            "editar-recursos" => " Editar os recursos de inscrição do sistema.",
            "visualizar-recursos-finais" => " Visualizar os recursos finais de inscrição do sistema.",
            "editar-recursos-finais" => " Editar os recursos finais de inscrição do sistema.",
            "visualizar-recursos-contra-a-prova" => " Visualizar os recursos contra a prova de inscrição do sistema.",
            "editar-recursos-contra-a-prova" => " Editar os recursos contra a prova de inscrição do sistema.",
            "visualizar-estatisticas" => " Visualizar as estatísticas do sistema.",
            "visualizar-notas" => " Visualizar as notas no sistema.",
            "cadastrar-notas" => " Cadastrar as notas no sistema.",
            "editar-notas" => " Editar as notas no sistema.",
            "visualizar-chamadas" => " Visualizar todas as chamadas do sistema.",
            "cadastrar-chamadas" => " Cadastrar as chamadas do sistema.",
            "editar-chamadas" => " Editar as chamadas do sistema.",
            "visualizar-classificacoes" => " Visualizar as classificações do sistema.",
            "visualizar-pre-matriculas" => " Visualizar todas as Pré-Matrículas do sistema.",
            "editar-pre-matriculas" => " Editar as Pré-Matrículas do sistema.",
            "redistribuir-vagas-campi-cursos" => " Redistribuir as vagas dos cursos.",
            "visualizar-disciplinas" => " Visualizar as Disciplinas no sistema.",
            "cadastrar-disciplinas" => " Cadastrar as Disciplinas no sistema.",
            "editar-disciplinas" => " Editar as Disciplinas no sistema.",
            "apagar-disciplinas" => " Apagar as Disciplinas no sistema.",
            "visualizar-criterios" => " Visualizar os Critérios no sistema.",
            "cadastrar-criterios" => " Cadastrar os Critérios no sistema.",
            "editar-criterios" => " Editar os Critérios no sistema.",
            "apagar-criterios" => " Apagar os Critérios no sistema.",
            "cadastrar-classificacoes" => " Gerar as listas de classificação no sistema.",
            "visualizar-modalidades" => " Visualizar as Modalidades no sistema.",
            "cadastrar-modalidades" => " Cadastrar as Modalidades no sistema.",
            "editar-modalidades" => " Editar as Modalidades no sistema.",
            "apagar-modalidades" => " Apagar as Modalidades no sistema.",
            "alocar-inscricoes-para-avaliacao" => " Alocar as Inscrições que Cada Admin Pode Avaliar",
            "socioeconomico" => " Avaliar todas as cotas que pertencem a modalidade socioeconômica",
            "heteroidentificacao" => " Avaliar todas as cotas que pertencem a modalidade heteroidentificação",
            "junta_medica" => " Avaliar todas as cotas que pertencem a modalidade junta médica",
            "etnica" => " Avaliar todas as cotas que pertencem a modalidade etnica",
            "genero" => " Avaliar todas as cotas que pertencem a modalidade identidade de gênero",
        ];
        $arrayOfGlobalPermissionNames = [
            "criar-edital" => " Criar Edital",
            "editar-edital" => " Editar Edital",
            "gerenciar-edital" => " Gerenciar Edital",
        ];

        foreach ($arrayOfLocalPermissionNames as $permission => $description) {
            // dd($arrayOfLocalPermissionNames,$permission,$description);
            Permission::create(["name" => $permission, "guard_name" => "api", "description" => $description, 'scope' => "local"]);
        }
        foreach ($arrayOfGlobalPermissionNames as $permission => $description) {
            Permission::create(["name" => $permission, "guard_name" => "api", "description" => $description, 'scope' => 'global']);
        }

        // Fetch permissions that belong to the 'local' scope
        $localPermissions = Permission::where('scope', 'local')
            ->whereNotIn('name', $arrayOfGlobalPermissionNames)
            ->get();

        // Fetch ALL permissions that belong to the 'global' scope
        $globalPermissions = Permission::where('scope', 'global')->get();

        Role::create(["name" => "admin", "guard_name" => "api", 'scope' => "local"])
            ->givePermissionTo($localPermissions);

        $role = Role::create(["name" => "super-Admin", "guard_name" => "api", 'scope' => "global"])
            ->givePermissionTo($globalPermissions);

        $user = User::first();
        if ($user) {
            $user->assignRole($role);
        }
    }
}
