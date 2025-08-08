<?php

use App\Http\Controllers\SuperAdmin\ManageRolePermissionsController;
use App\Http\Controllers\SuperAdmin\EditalController;
use App\Http\Controllers\SuperAdmin\ManageUserPermissionsController;
use App\Http\Controllers\SuperAdmin\PermissionsController;
use Illuminate\Support\Facades\Route;

Route::prefix("/super-admin")->name('super-Admin.')->middleware(['role:super-Admin'])->group(function(){
    Route::resource('/edital', EditalController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::prefix("/roles")->name("role.")->group(function(){
        Route::resource('', ManageRolePermissionsController::class)
                ->only(['index', 'show', 'store', 'update', 'destroy'])
                ->parameter('' , 'role');
    });

    Route::prefix("/permissions")->name('permissions.')->group(function(){
        Route::resource('', PermissionsController::class)
                ->only(['index', 'show'])
                ->parameter('' , 'permission');
    });
    Route::prefix('/permissions-scope')->name('permissions-scope.')->group(function(){
        Route::get('local',[ PermissionsController::class, 'indexLocal']);
        Route::get('global',[ PermissionsController::class, 'indexGlobal']);
    });

    Route::prefix('/usuarios')->name('usuarios.')->group(function(){
        Route::prefix('/{userId}/permissions')->name('permissions.')->group(function () {
            Route::singleton('', ManageUserPermissionsController::class)->only(['show', 'update']);
        });
    });
});
