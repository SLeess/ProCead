<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;

Route::middleware(['throttle:api',])->name('usuario.')->group(function(){
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::post('/login', [LoginController::class, 'loginCandidate'])->name('login');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword'])->name('password.update');


/* ------------- Guest - Administrador ------------- */
    Route::prefix('/admin')->name('admin.')->group(function(){
        Route::post('/login', [LoginController::class, 'loginAdmin']);
    });
/* ---------- Fim - Guest - Administrador ---------- */
});


