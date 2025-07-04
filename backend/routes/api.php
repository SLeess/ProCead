<?php

use App\Http\Controllers\Admin\RelatorioController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogOutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserPermissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/user', [UserPermissionController::class, 'userPermissions']) ->middleware('auth:sanctum');

Route::view('/pdf', 'Relatorio', ['columns' => [
["id" => 'n_inscricao', "header" => 'Número de Inscrição'],
["id" => 'nome', "header" => 'Nome Completo'],
["id" => 'email', "header" => 'Email'],
["id" => 'cpf', "header" => 'CPF'],
["id" => 'modalidade', "header" => 'Modalidade'],
["id" => 'status', "header" => 'Status'],

], 'rows' => []]);


Route::get('/users', function(){
    return response()->json([
        'success' => true,
        'data' => [
            "users" => App\Models\User::all()
        ],
        // 'success' => false,
        // 'error' => 'Not found Exception',
        // 'data' => [
            // "users" => App\Models\User::all()
        // ],
    ]);
});

Route::middleware(['throttle:global'])->group(function(){
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
});



Route::middleware(['auth:sanctum', 'throttle:auth'])->group( function () {
    Route::get('/test', function(){
        return response()->json(['teste' => 'message']);
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

    Route::post('/export', [RelatorioController::class, 'export'])->name('export');

    Route::post('/logout', [LogOutController::class, 'logout'])->name('logout');
});
