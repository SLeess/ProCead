<?php

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

        Route::prefix('{edital}')->name('manage.')->group(function(){
        // Route::get('inscricoes', [InscricaoController::class, 'index'])->name('inscricoes.index');
        });
    });

    Route::resource('/polos', PolosController::class)->except('index');

    Route::middleware(['throttle:heavy'])->post('/export', [RelatorioController::class, 'export'])->name('export');
});
