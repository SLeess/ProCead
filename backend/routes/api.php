<?php

use App\Http\Controllers\Admin\RelatorioController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogOutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserPermissionController;
use Illuminate\Support\Facades\Route;


/* ---------- USUÁRIO ---------- */
Route::name('usuario.')->group(function(){
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::post('/login', [LoginController::class, 'loginCandidate'])->name('login');
    // Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    // Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');
})->middleware(['throttle:global']);



Route::name('candidato.')->group( function () {
    Route::name('usuario.')->group(function() {
        Route::get('/user', [UserPermissionController::class, 'userPermissions'])->name('dados');
        Route::post('/logout', [LogOutController::class, 'logout'])->name('logout');
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
    })->middleware('permission:editar-inscricoes');
    Route::post('/export', [RelatorioController::class, 'export'])->name('export');

})->middleware(['auth:sanctum', 'role:candidate']);
/* ---------- FIM - CANDIDATO ---------- */


/* ------------- ADMINISTRADOR ------------- */
/* Rotas de Login do Administrador */
Route::prefix('admin')->name('admin.')->group(function(){
    Route::post('/admin/login', [LoginController::class, 'loginAdmin']);
})->middleware(['auth:sanctum', 'permission:admin']);
/* ---------- FIM - ADMINISTRADOR ---------- */



/* ------------- SUPER-ADMINISTRADOR ------------- */
/* Rotas de Login do Administrador */
Route::name('superAdmin')->group(function(){

})->middleware(['auth:sanctum', 'role:super-Admin']);
/* ---------- FIM - SUPER-ADMINISTRADOR ---------- */

