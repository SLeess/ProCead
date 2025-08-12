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

require __DIR__.'\api\guest.php';


Route::middleware(['auth:sanctum', 'throttle:auth'])->group(function () {
    require __DIR__.'\api\auth.php';
    require __DIR__.'\api\candidate.php';
    require __DIR__.'\api\admin.php';
    require __DIR__.'\api\super_admin.php';
    require __DIR__.'\api\inscricao.php';
});
