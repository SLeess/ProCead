<?php

namespace App\Services\Admin\SyncRolePermissions;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class SyncRolePermissionsService implements \App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService{

    public function syncPermissionsToRole(string|int $roleId, array $permissionIds): void
    {
        $role = Role::findOrFail($roleId);
        
        DB::transaction(function () use ($role, $permissionIds){
            if (empty($permissionIds)) {
                $role->syncPermissions([]);
                return;
            }

            $permissions = Permission::findMany($permissionIds);

            if ($permissions->count() !== count($permissionIds)) {
                throw new \Illuminate\Database\Eloquent\ModelNotFoundException('Uma ou mais permissões não foram encontradas.');
            }

            $role->syncPermissions($permissions);
        });
    }
}
