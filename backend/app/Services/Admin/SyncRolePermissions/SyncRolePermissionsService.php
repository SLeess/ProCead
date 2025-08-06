<?php

namespace App\Services\Admin\SyncRolePermissions;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class SyncRolePermissionsService implements \App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService{
    public function syncPermissionsToRole(int $roleId, array $permissionIds): void
    {
        DB::transaction(function () use ($roleId, $permissionIds) {

            $role = Role::findOrFail($roleId);
            $permissions = Permission::findMany($permissionIds);

            if ($permissions->count() !== count($permissionIds)) {
                throw new \Illuminate\Database\Eloquent\ModelNotFoundException('Uma ou mais permissões não foram encontradas.');
            }

            $role->syncPermissions($permissions);

            return $role;
        });
    }
}
