<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


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


Route::controller(RegisterController::class)->group(function(){
    Route::post('/register', 'register')->name('register');
    Route::post('/login', 'login')->name('login');
})->middleware(['throttle:global']);



Route::middleware(['auth:sanctum', 'throttle:auth'])->group( function () {
    Route::get('/test', function(){
        return response()->json(['teste' => 'message']);
    });

    Route::post('/logout', [RegisterController::class, 'logout'])->name('logout');
});
