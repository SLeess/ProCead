<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

