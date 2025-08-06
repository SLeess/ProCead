<?php

use App\Http\Controllers\Admin\UserPermissionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:global'])->group(function(){
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/test', function() {

        $userParaAutenticar = App\Models\User::where('email', 'leandro.freitas@edu.unimontes.br')->first();
        if ($userParaAutenticar) {
            Auth::login($userParaAutenticar); // Autentique AQUI
        }
        return view('show', [
            "user" => $userParaAutenticar,
            "edital" => App\Models\Edital::find(2),
        ]);
    });


    Route::view('/pdf', 'Relatorio',
    ['columns' => [
        ["id" => 'n_inscricao', "header" => 'Número de Inscrição'],
        ["id" => 'nome', "header" => 'Nome Completo'],
        ["id" => 'email', "header" => 'Email'],
        ["id" => 'cpf', "header" => 'CPF'],
        ["id" => 'modalidade', "header" => 'Modalidade'],
        ["id" => 'status', "header" => 'Status'],

    ], 'rows' => []]);












    Route::get('/test-permissions', function(){
        $user = Illuminate\Support\Facades\Auth::attempt(['email' => 'leandro.freitas@edu.unimontes.br', 'password'=> 'asdasdasd']);
        $CONTROLLER = new UserPermissionController();
        return $CONTROLLER->userPermissions(new Illuminate\Http\Request([], ['user' => Illuminate\Support\Facades\Auth::user()]));
    });


    Route::get('/teste/admin/editais', function(){
        return response()->json(
            [
                'editais' => App\Models\Edital::all()->toArray(),
                'role' => App\Models\Role::all()->map(function($role) {
                    return ['id' => $role->id, 'name' => $role->name, 'scope' => $role->scope];
                })->toArray(),
                'permission' => App\Models\Permission::all()->map(function($permission) {
                    return ['id' => $permission->id, 'name' => $permission->name, 'scope' => $permission->scope];
                })->toArray(),
            ]
        );
    });
});
