<?php

use App\Http\Controllers\InscricaoController;
use Illuminate\Support\Facades\Route;


Route::post('/inscricao',[InscricaoController::class,'store']);
Route::get('/inscricao/{userUuid}',[InscricaoController::class,'index']);
Route::get('/inscricao/{userUuid}/{editalId}',[InscricaoController::class,'show']);