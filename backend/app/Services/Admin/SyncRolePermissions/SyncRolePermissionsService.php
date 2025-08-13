<?php

namespace App\Services\Admin\SyncRolePermissions;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SyncRolePermissionsService implements \App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService{
    public function syncPermissionsToRole(Role $role, array $permissionIds): void
    {
        if (empty($permissionIds)) {
            $role->syncPermissions([]);
            return;
        }

        $permissions = Permission::findMany($permissionIds);

        if ($permissions->count() !== count($permissionIds)) {
            throw new \Illuminate\Database\Eloquent\ModelNotFoundException('Uma ou mais permissões não foram encontradas.');
        }

        $role->syncPermissions($permissions);
    }

    public function updateScopeRole(Role $role, string $scope): void
    {
        $this->syncPermissionsToRole($role, []);
        $role->scope = $scope;
        $role->save();
    }

    public function updateDataRole(Role $role, array $roleData): void
    {
        $role->update($roleData);
    }

    public function updateRoleAndSyncPermissions(int $roleId, array $roleData, array $permissionIds): void
    {
        DB::transaction(function () use ($roleId, $roleData, $permissionIds) {
            $role = Role::findOrFail($roleId);

            if($role->scope != $roleData['scope']){
                $this->updateScopeRole($role, $roleData["scope"]);
            }
            else{
                $this->updateDataRole($role,  Arr::except($roleData, ['scope']));
                $this->syncPermissionsToRole($role, $permissionIds);
            }

        });
    }
}
