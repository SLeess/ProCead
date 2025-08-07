<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LogOutController;
use App\Http\Controllers\UserController;

Route::name('usuario.')->group(function() {
    Route::singleton('/user', UserController::class)->only(['show', 'update']);
    Route::get('/user-with-permissions',[UserController::class, 'getPermissions'])->name('permissions.show');
    Route::post('/logout', [LogOutController::class, 'logout'])->name('logout');
});
