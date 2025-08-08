<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LogOutController;
use App\Http\Controllers\UserController;



Route::prefix('/usuario')->name('usuario.')->group(function() {
    Route::get('/permissions',[UserController::class, 'getPermissions'])->name('permissions.show');
    Route::singleton('', UserController::class)->only(['show', 'update']);
    Route::post('/logout', [LogOutController::class, 'logout'])->name('logout');
});
