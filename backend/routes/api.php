<?php

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
