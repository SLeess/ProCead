<?php

use App\Http\Controllers\InscricaoController;
use Illuminate\Support\Facades\Route;


Route::post('/inscricao',[InscricaoController::class,'store']);