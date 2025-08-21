<?php

use App\Http\Controllers\Admin\CursosController;
use App\Http\Controllers\Admin\EditalController;
use App\Http\Controllers\Admin\PolosController;
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

    Route::resource('/polos', PolosController::class)->except('index');
    Route::resource('/cursos', CursosController::class)->except('index');

    Route::middleware(['throttle:heavy'])->post('/export', [RelatorioController::class, 'export'])->name('export');
});
