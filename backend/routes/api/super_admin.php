<?php

use App\Http\Controllers\SuperAdmin\EditalController;
use Illuminate\Support\Facades\Route;

Route::prefix("/super-admin")->name('superAdmin')->middleware(['role:super-Admin'])->group(function(){
    Route::resource('/edital', EditalController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
});
