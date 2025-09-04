<?php

use App\Http\Controllers\Admin\CursosController;
use App\Http\Controllers\Admin\DisciplinaController;
use App\Http\Controllers\Admin\EditalController;
use App\Http\Controllers\Admin\InscricaoController;
use App\Http\Controllers\Admin\PolosController;
use App\Http\Controllers\Admin\QuadroVagasController;
use App\Http\Controllers\Admin\VagasController;
use App\Http\Controllers\ModalidadesController;
use App\Models\QuadroVagas;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ManageUserController;
use App\Http\Controllers\Admin\RelatorioController;


Route::prefix('/admin')->name('admin.')->group( function () {
    Route::prefix('/manage-users')->name('manage-users.')->group(function(){
        Route::resource('', ManageUserController::class)
                ->parameters(['' => 'user'])
                ->only(['index', 'show', 'update']);
    });

    Route::prefix('/editais')->name('editais.')->group(function(){
        Route::get('', [EditalController::class, 'index'])->name('index');

        Route::prefix('{edital}')->group(function(){
            Route::get('', [EditalController::class, 'show'])->name('show');
            // Route::get('inscricoes', [InscricaoController::class, 'index'])->name('.manage.inscricoes.index');
        });
    });

    Route::resource('/polos', PolosController::class)->except(['index','create','edit']);
    Route::resource('/cursos', CursosController::class)->except(['index','create','edit']);
    Route::resource('/modalidades', ModalidadesController::class)->except(['index','create','edit']);
    Route::get('/vagas/{editalId}', [VagasController::class, 'index']);
    Route::resource('/quadro-vagas', QuadroVagasController::class)->except(['index','create','edit','show']);
    Route::get('/quadro-vagas/{editalId}', [QuadroVagasController::class, 'index']);
    Route::resource('/disciplinas', DisciplinaController::class)->except(['index','create','edit']);

    Route::get('/inscricoes/{editalId}', [InscricaoController::class, 'index'])->name('inscricoes.index');

    Route::middleware(['throttle:heavy'])->post('/export', [RelatorioController::class, 'export'])->name('export');
});
