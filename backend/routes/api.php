<?php

use App\Http\Controllers\Admin\RelatorioController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogOutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\Admin\UserPermissionController as ManageUserPermissionsController;
use Illuminate\Support\Facades\Route;

/* ---------- USUÁRIO ---------- */
Route::middleware(['throttle:global'])->name('usuario.')->group(function(){
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::post('/login', [LoginController::class, 'loginCandidate'])->name('login');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword'])->name('password.update');
});

Route::middleware(['auth:sanctum'])->name('candidato.')->group( function () {
    Route::name('usuario.')->group(function() {
        Route::get('/user', [UserPermissionController::class, 'userPermissions'])->name('dados');
        Route::post('/logout', [LogOutController::class, 'logout'])->name('logout');
    });

    /** Rotas de Teste -- Serão apagadas depois */
    Route::name('home.')->group(function(){
        Route::get('/user/meus-processos', function(){
            $response = [
                'success' => true,
                'data'    =>
                collect(
                [
                    [
                        "id" => 1,
                        "edital" => 'EDITAL N.° 08/2025',
                        "descricao" => 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
                        "status" => "Em andamento",
                        "obs" => "",
                        // "obs" => "Inscrições abertas até 30/07/2025.",
                    ],
                    [
                        "id" => 2,
                        "edital" => 'EDITAL N.° 11/2024',
                        "descricao" => 'Processo de Seleção de Discentes para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
                        "status" => "Em andamento",
                        // "obs" => "Resultado da primeira fase previsto para 15/07/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 3,
                        "edital" => 'EDITAL N.° 01/2025',
                        "descricao" => 'Seleção de tutores para cursos de Educação a Distância (EaD) - Área de Tecnologia',
                        "status" => "Encerrado",
                        // "obs" => "Inscrições finalizadas em 01/06/2025. Aguardando resultado final.",
                        "obs" => "",
                    ],
                    [
                        "id" => 4,
                        "edital" => 'EDITAL N.° 12/2024',
                        "descricao" => 'Seleção para Mestrado em Produção Vegetal no Semiárido - Turma 2025',
                        "status" => "Encerrado",
                        // "obs" => "Processo concluído. Matrículas realizadas.",
                        "obs" => "",
                    ],
                    [
                        "id" => 5,
                        "edital" => 'EDITAL N.° 03/2025',
                        "descricao" => 'Concurso Público para Professor Efetivo - Área de Direito',
                        "status" => "Em andamento",
                        // "obs" => "Provas objetivas agendadas para 20/08/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 6,
                        "edital" => 'EDITAL N.° 05/2024',
                        "descricao" => 'Processo Seletivo Simplificado para Coordenador de Curso de Engenharia Civil',
                        "status" => "Encerrado",
                        // "obs" => "Candidato aprovado e empossado.",
                        "obs" => "",
                    ],
                    [
                        "id" => 7,
                        "edital" => 'EDITAL N.° 07/2025',
                        "descricao" => 'Residência Médica em Cirurgia Geral - Ano 2026',
                        "status" => "Em andamento",
                        // "obs" => "Período de recurso para a prova teórica. Resultado final em Setembro.",
                        "obs" => "",
                    ],
                    [
                        "id" => 8,
                        "edital" => 'EDITAL N.° 02/2025',
                        "descricao" => 'Bolsas de Pós-Doutorado PNPD/CAPES - Ciências Humanas',
                        "status" => "Encerrado",
                        // "obs" => "Seleção finalizada. Início das atividades em 01/08/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 9,
                        "edital" => 'EDITAL N.° 09/2025',
                        "descricao" => 'Curso de Extensão em Marketing Digital - Turma de Verão',
                        "status" => "Em andamento",
                        // "obs" => "Últimas vagas disponíveis. Início das aulas em 05/08/2025.",
                        "obs" => "",
                    ],
                    [
                        "id" => 10,
                        "edital" => 'EDITAL N.° 04/2024',
                        "descricao" => 'Seleção de Professores Temporários - Licenciatura em Química',
                        "status" => "Encerrado",
                        // "obs" => "Edital homologado e classificados divulgados.",
                        "obs" => "",
                    ],
                    [
                        "id" => 11,
                        "edital" => 'EDITAL N.° 06/2025',
                        "descricao" => 'Processo de Seleção para Auxiliar Administrativo - Cursinho Popular',
                        "status" => "Em andamento",
                        // "obs" => "Entrevistas agendadas para a próxima semana.",
                        "obs" => "",
                    ],
                    [
                        "id" => 12,
                        "edital" => 'EDITAL N.° 10/2025',
                        "descricao" => 'Chamada Pública para Atores para Peça Teatral Universitária',
                        "status" => "Em andamento",
                        // "obs" => "Audições abertas até 25/07/2025.",
                        "obs" => "",
                    ],
                ]) ->sort(function($a, $b){
                    return
                        $a['status'] <=> $b['status'];
                })->values()
                ->toArray(),
                'message' => 'Processos seletivos pessoais encaminhados com sucesso.',
            ];
            return response()->json($response, 200);
        });
        Route::get('/data', function(){
            return response()->json(['data' =>
                [
                    [
                        "id" => 1,
                        "n_inscricao" => "252400007",
                        "nome" => "FREITAS DE LEGAL CAP",
                        "email" => "legalcape@gmail.com",
                        "cpf" => "939.322.670-95",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 2,
                        "n_inscricao" => "252400029",
                        "nome" => "CLEIDE DO CARLINHOS",
                        "email" => "cleidesemmapinha@teste.com",
                        "cpf" => "868.768.403-79",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 3,
                        "n_inscricao" => "252400335",
                        "nome" => "GMAIL DO GOOGLE SANTSOA",
                        "email" => "gmail.com.gollgl@gmail.com",
                        "cpf" => "752.779.808-49",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 4,
                        "n_inscricao" => "252400121",
                        "nome" => "MARIA DE SUPINO AGACHADO",
                        "email" => "supinoevida@br.br",
                        "cpf" => "016.970.201-43",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 5,
                        "n_inscricao" => "252400323",
                        "nome" => "VIEIRA TESTE DE VIEIRA",
                        "email" => "vieira@gmail.com",
                        "cpf" => "231.013.620-40",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 6,
                        "n_inscricao" => "252400231",
                        "nome" => "ROSANGELA ROSA ROSEIRA",
                        "email" => "ROSAROSAROSA@com.br",
                        "cpf" => "088.364.589-04",
                        "modalidade" => "AC",
                        "status" => "DEFERIDO",
                    ],
                    [
                        "id" => 7,
                        "n_inscricao" => "254400036",
                        "nome" => "HEIDTH SQL SILVA",
                        "email" => "heidthsql@gmail.com",
                        "cpf" => "270.709.433-18",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 8,
                        "n_inscricao" => "253400039",
                        "nome" => "RIBEIRO LIMA FARELO",
                        "email" => "testepreto@gmail.com",
                        "cpf" => "877.009.303-25",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 9,
                        "n_inscricao" => "252400342",
                        "nome" => "RAMSSES SEGUNDO",
                        "email" => "ramssesssegundo@gmail.com",
                        "cpf" => "746.081.409-14",
                        "modalidade" => "AC",
                        "status" => "DEFERIDO",
                    ],
                    [
                        "id" => 10,
                        "n_inscricao" => "252400145",
                        "nome" => "OLIVEIRA CARDOSO PEDROSA",
                        "email" => "cardosooliveirapedrosa@gmail.com",
                        "cpf" => "804.554.214-47",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 11,
                        "n_inscricao" => "252400247",
                        "nome" => "SANTOS LEIA LOPES",
                        "email" => "sodo122340@gmail.com",
                        "cpf" => "208.798.375-51",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 12,
                        "n_inscricao" => "252400041",
                        "nome" => "FARLEY KELLY LINGUIÇA",
                        "email" => "farley.leve@edu.pbh.gov.br",
                        "cpf" => "356.014.070-61",
                        "modalidade" => "AC",
                        "status" => "DEFERIDO",
                    ],
                    [
                        "id" => 13,
                        "n_inscricao" => "252400149",
                        "nome" => "HENRIQUE JESUS CRISTIELLE",
                        "email" => "henrique.cristielle@gov.br",
                        "cpf" => "833.483.357-10",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ],
                    [
                        "id" => 14,
                        "n_inscricao" => "252400551",
                        "nome" => "PEREIRA DE JESUS",
                        "email" => "testedsiva@gmail.com",
                        "cpf" => "594.270.551-89",
                        "modalidade" => "AC",
                        "status" => "DEFERIDO",
                    ],
                    [
                        "id" => 15,
                        "n_inscricao" => "252402052",
                        "nome" => "JESUS SANTOS",
                        "email" => "ayara2356ssse@gmail.com",
                        "cpf" => "351.436.483-43",
                        "modalidade" => "AC",
                        "status" => "INDEFERIDO",
                    ]

                ]
            ], 200);
        });
    });
    /** ---------------------- Fim Rotas de Teste ---------------------- */

    Route::post('/export', [RelatorioController::class, 'export'])->name('export');

});
/* ---------- FIM - CANDIDATO ---------- */



/* ------------- ADMINISTRADOR ------------- */
/* Rotas de Login do Administrador */
Route::prefix('/admin')->name('admin.')->group(function(){
    Route::post('/login', [LoginController::class, 'loginAdmin']);
});


Route::prefix('/admin')->middleware(['auth:sanctum', 'admin-Access'])->name('admin.')->group( function () {

    // Gerenciamento geral de usuários
    Route::prefix('/users')->name('users.')->group(function(){
        Route::get("", [UserController::class, 'index'])->name('index');

        // Gerenciamento de permissões dos usuários
        Route::prefix('{userId}/permissions')->name('permissions.')->group(function () {
            Route::get('', [ManageUserPermissionsController::class, 'show'])->name('show');
            Route::put('', [ManageUserPermissionsController::class, 'update'])->name('update');
        });
    });


    Route::prefix('/editais')->name('editais.')->group(function(){
        Route::get('', function(){
            $response = [
                'success' => true,
                'data'    =>
                collect(
                    [
                        "editais" =>
                        collect([
                            [
                                "id" => 1,
                                "edital" => 'EDITAL N.° 08/2025',
                                "descricao" => 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
                                "status" => "Em andamento",
                            ],
                            [
                                "id" => 2,
                                "edital" => 'EDITAL N.° 11/2024',
                                "descricao" => 'Processo de Seleção de Discentes para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
                                "status" => "Em andamento",
                            ],
                            [
                                "id" => 3,
                                "edital" => 'EDITAL N.° 01/2025',
                                "descricao" => 'Seleção de tutores para cursos de Educação a Distância (EaD) - Área de Tecnologia',
                                "status" => "Encerrado",
                            ],
                            [
                                "id" => 4,
                                "edital" => 'EDITAL N.° 12/2024',
                                "descricao" => 'Seleção para Mestrado em Produção Vegetal no Semiárido - Turma 2025',
                                "status" => "Encerrado",
                            ],
                            [
                                "id" => 5,
                                "edital" => 'EDITAL N.° 03/2025',
                                "descricao" => 'Concurso Público para Professor Efetivo - Área de Direito',
                                "status" => "Em andamento",
                            ],
                            [
                                "id" => 6,
                                "edital" => 'EDITAL N.° 05/2024',
                                "descricao" => 'Processo Seletivo Simplificado para Coordenador de Curso de Engenharia Civil',
                                "status" => "Encerrado",
                            ],
                            [
                                "id" => 7,
                                "edital" => 'EDITAL N.° 07/2025',
                                "descricao" => 'Residência Médica em Cirurgia Geral - Ano 2026',
                                "status" => "Em andamento",
                            ],
                            [
                                "id" => 8,
                                "edital" => 'EDITAL N.° 02/2025',
                                "descricao" => 'Bolsas de Pós-Doutorado PNPD/CAPES - Ciências Humanas',
                                "status" => "Encerrado",
                            ],
                            [
                                "id" => 9,
                                "edital" => 'EDITAL N.° 09/2025',
                                "descricao" => 'Curso de Extensão em Marketing Digital - Turma de Verão',
                                "status" => "Em andamento",
                            ],
                            [
                                "id" => 10,
                                "edital" => 'EDITAL N.° 04/2024',
                                "descricao" => 'Seleção de Professores Temporários - Licenciatura em Química',
                                "status" => "Encerrado",
                            ],
                            [
                                "id" => 11,
                                "edital" => 'EDITAL N.° 06/2025',
                                "descricao" => 'Processo de Seleção para Auxiliar Administrativo - Cursinho Popular',
                                "status" => "Em andamento",
                            ],
                            [
                                "id" => 12,
                                "edital" => 'EDITAL N.° 10/2025',
                                "descricao" => 'Chamada Pública para Atores para Peça Teatral Universitária',
                                "status" => "Em andamento",
                            ],
                        ])->sort(function($a, $b){
                            return
                                $a['status'] <=> $b['status'];
                        })->values()->toArray(),
                    ]
                )->toArray(),
                'message' => 'Todos os processos seletivos existentes no sistema foram encaminhados com sucesso.',
            ];
            return response()->json($response, 200);
        })->name('index');

        Route::prefix('{edital}')->name('manage.')->group(function(){
            // Route::get('inscricoes', [InscricaoController::class, 'index'])->name('inscricoes.index');
        });
    });

    Route::get('/teste', function(){
        return response()->json(['atumalaca' => 'tome'], 202);
    });
});


/* ---------- FIM - ADMINISTRADOR ---------- */


/* ------------- SUPER-ADMINISTRADOR ------------- */
/* Rotas de Login do Administrador */
Route::name('superAdmin')->group(function(){

})->middleware(['auth:sanctum', 'role:super-Admin']);
/* ---------- FIM - SUPER-ADMINISTRADOR ---------- */









Route::get('/test-permissions', function(){
    $user = Illuminate\Support\Facades\Auth::attempt(['email' => 'leandro.freitas@edu.unimontes.br', 'password'=> 'asdasdasd']);
    $CONTROLLER = new UserPermissionController();
    return $CONTROLLER->userPermissions(new Illuminate\Http\Request([], ['user' => Illuminate\Support\Facades\Auth::user()]));
});



Route::get('/teste/admin/editais', function(){
    return response()->json(
        [
            'editais' => App\Models\Edital::all()->toArray(),
            'roles' => App\Models\Roles::all()->map(function($role) {
                return ['id' => $role->id, 'name' => $role->name];
            })->toArray(),
            'permissions' => Spatie\Permission\Models\Permission::all()->map(function($permission) {
                return ['id' => $permission->id, 'name' => $permission->name];
            })->toArray(),
        ]
    );
});
