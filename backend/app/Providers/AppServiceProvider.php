<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(\App\Interfaces\Auth\IAuthService::class, \App\Services\Auth\AuthService::class);

        $this->app->bind(\App\Interfaces\User\IUserService::class, \App\Services\User\UserService::class);
        $this->app->bind(\App\Interfaces\SuperAdmin\ISuperAdminUserManagerService::class, \App\Services\User\UserService::class);

        $this->app->bind(\App\Interfaces\User\IManageUserRolesAndPermissionsService::class, \App\Services\User\ManageUserRolesAndPermissionsService::class);

        $this->app->bind( \App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService::class,  \App\Services\Admin\SyncRolePermissions\SyncRolePermissionsService::class);
        $this->app->bind( \App\Interfaces\Admin\RoleService\IRoleService::class,  \App\Services\Admin\RoleService\RoleService::class);
        $this->app->bind( \App\Interfaces\Admin\EditalService\IEditalService::class,  \App\Services\Admin\EditalService\EditalService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Carbon::setlocale('pt_BR.utf8');

        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
