<?php

/* ================================================================================= */

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

require __DIR__.'/api/guest.php';


Route::middleware(['auth:sanctum', 'extends-sanctum-token-life'])->group(function () {

    Route::middleware(['throttle:user'])->group(function(){
        require __DIR__.'/api/auth.php';
    });

    Route::middleware(['throttle:candidate'])->group(function(){

        require __DIR__.'/api/candidate.php';
        require __DIR__.'/api/inscricao.php';
    });

    Route::middleware(['throttle:admin'])->group(function(){
        require __DIR__.'/api/admin.php';
        require __DIR__.'/api/super_admin.php';
    });
});
