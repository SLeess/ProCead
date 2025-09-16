<?php

use App\Http\Controllers\AnexosController;
use App\Http\Controllers\SuperAdmin\ManageRolePermissionsController;
use App\Http\Controllers\SuperAdmin\EditalController;
use App\Http\Controllers\SuperAdmin\LogController;
use App\Http\Controllers\SuperAdmin\ManageUserPermissionsController;
use App\Http\Controllers\SuperAdmin\PermissionsController;
use App\Http\Controllers\SuperAdmin\RoleController;
use App\Http\Controllers\SuperAdmin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix("/super-admin")->name('super-Admin.')->middleware(['role:super-Admin'])->group(function(){
    Route::name("roles.")->group(function(){
        Route::resource('/roles-with-permissions', ManageRolePermissionsController::class)
                ->only(['index','show', 'update'])
                ->parameter('roles-with-permissions' , 'role');

        Route::get('/roles-with-permissions-scope-local',[ ManageRolePermissionsController::class, 'indexLocal'])->name('index.local');
        Route::get('/roles-with-permissions-scope-global',[ ManageRolePermissionsController::class, 'indexGlobal'])->name('index.global');

        Route::resource('/roles', RoleController::class)
                ->only(['index', 'store', 'update', 'destroy'])
                ->parameter('' , 'role');
    });

    Route::prefix('/roles-scope')->name('roles-scope.')->group(function(){
        Route::get('local',[ RoleController::class, 'indexLocal']);
        Route::get('global',[ RoleController::class, 'indexGlobal']);
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

    Route::prefix('/users')->name('usuarios.')->group(function(){
        Route::get("", [UserController::class, 'index'])->name('index');
        Route::post('/register', [UserController::class, 'store'])->name('store');

        Route::prefix('/{user}')->name('permissions.')->group(function () {
            Route::singleton('/permissions', ManageUserPermissionsController::class)->only(['show']);
            Route::patch("/set-roles-and-permissions/global", [ManageUserPermissionsController::class, 'updateGlobal']);
            Route::patch("/set-roles-and-permissions/local", [ManageUserPermissionsController::class, 'updateLocal']);
            Route::patch('', [UserController::class, 'update'])->name('update');
            Route::delete('/delete', [UserController::class, 'delete'])->name('delete');
            Route::delete('/destroy', [UserController::class, 'destroy'])->name('destroy');
        });
    });


    Route::prefix('/logs')->name('logs.')->group(function(){
        Route::resource('', LogController::class)
            ->only('index', 'show')
            ->parameter('' , 'Activity');

        Route::get('/user/{user}/{Activity}', [LogController::class, 'userShow']);
        Route::get('/user/{user}', [LogController::class, 'userIndex']);
    });
});
