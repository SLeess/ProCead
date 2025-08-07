<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ManageUserController;
use App\Http\Controllers\Admin\ManageUserPermissionsController;
use App\Http\Controllers\Admin\ManageRolePermissionsController;
use App\Http\Controllers\Admin\RelatorioController;


Route::prefix('/admin')->name('admin.')->group( function () {
    Route::prefix('/manage-users')->name('manage-users.')->group(function(){
        Route::resource('', ManageUserController::class)
                ->parameters(['' => 'user'])
                ->only(['index', 'show', 'update']);
        Route::prefix('{userId}/permissions')->name('permissions.')->group(function () {
            Route::singleton('', ManageUserPermissionsController::class)->only(['show', 'update']);
        });
    });

    Route::prefix("/roles")->name('roles.')->group(function(){
        Route::singleton('', ManageRolePermissionsController::class)
            ->only(['index', 'show', 'store', 'update']);
        Route::post("/manage-permissions", [ManageRolePermissionsController::class, 'update'])->name('permissions.update');
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

    Route::post('/export', [RelatorioController::class, 'export'])->name('export');
});
