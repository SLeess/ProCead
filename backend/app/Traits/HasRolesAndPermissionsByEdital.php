<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

trait HasRolesAndPermissionsByEdital
{

    public function getAllRolesAndPermissionsByEdital(): array
    {
        $rawRoleData = DB::table('model_has_roles_by_edital')->where('user_id', $this->uuid)->get();
        $rawPermissionsData = DB::table('model_has_permission_by_edital')->where('user_id', $this->uuid)->get();

        if($rawRoleData->isEmpty() && $rawPermissionsData->isEmpty()) return [];

        $rawPermissionsData = $rawPermissionsData->groupBy('edital_id');
        $rawRoleData = $rawRoleData->groupBy('edital_id');

        /**
         * Verificação mínima se há permissões ou cargos por edital para o usuário para simplificar o foreach com acesso direto de array
         */
        $min = collect($rawPermissionsData->keys())->merge($rawRoleData->keys())->unique()->values()->sort();

        return $min->mapWithKeys(function(int $edital_id) use ($rawPermissionsData, $rawRoleData){
            $permissions = $roles = $aditional_permissions = collect();

            if($rawRoleData->has($edital_id))
            {
                $roles = $rawRoleData[$edital_id]
                    ->map(function($data){
                        return Role::find($data->role_id)->name;
                    })
                    ->unique()
                    ->values();

                $permissions = $rawRoleData[$edital_id]
                    ->flatMap(function($data){
                        $role = Role::find($data->role_id);
                        return $role->getAllPermissions()->pluck('name');
                    })
                    ->unique()
                    ->values();
            }

            if($rawPermissionsData->has($edital_id)){
                $permissionsByUserByEdital = $rawPermissionsData[$edital_id]
                                            ->map(fn($item)=> Permission::find($item->permission_id)->name)
                                            ->filter(fn($e) => $e !== null);

                $aditional_permissions = $permissionsByUserByEdital->unique();
            }

            return [
                    $edital_id => [
                        'permissions' => $permissions->toArray(),
                        'aditional_permissions' => $aditional_permissions->toArray(),
                        'roles' => $roles->toArray()
                    ]
                ];
        })->toArray();
    }

    /**
     * Check if the user has any role for any edital.
     *
     * @param string|int $roleNameOrId
     * @param int $editalId
     * @return bool
     */
    public function hasAnyRoleByEdital(): bool
    {
        return DB::table('model_has_roles_by_edital')
        ->where('user_id', $this->uuid)
        ->exists();
    }

    /**
     * Check if the user has any permission for any edital.
     *
     * @param string|int $roleNameOrId
     * @param int $editalId
     * @return bool
     */
    public function hasAnyPermissionByEdital(): bool
    {
        return DB::table('model_has_permission_by_edital')
        ->where('user_id', $this->uuid)
        ->exists();
    }

    public function dontHaveAnyPermissionOrRole(){
        return $this->getRoleNames()->isEmpty()
            && $this->getAllPermissions()->isEmpty()
            && !$this->hasAnyRoleByEdital()
            && !$this->hasAnyPermissionByEdital();
    }


    /**
     * Vincula um cargo a um usuário para um edital específico.
     *
     * @param string|int|\Spatie\Permission\Models\Role $role
     * @param \App\Models\Edital|int $edital
     * @return void
     */
    public function assignRoleForEdital($role, $edital): void
    {
        $roleId = $role instanceof Role ? $role->id : (is_string($role) ? Role::findByName($role)->id : $role);
        $editalId = $edital instanceof \App\Models\Edital ? $edital->id : $edital;

        DB::table('model_has_roles_by_edital')->updateOrInsert(
            ['user_id' => $this->uuid, 'role_id' => $roleId, 'edital_id' => $editalId],
            ['user_id' => $this->uuid, 'role_id' => $roleId, 'edital_id' => $editalId]
        );
    }

    /**
     * Remove um cargo de um usuário para um edital específico.
     *
     * @param string|int|\Spatie\Permission\Models\Role $role
     * @param \App\Models\Edital|int $edital
     * @return int
     */
    public function removeRoleForEdital($role, $edital): int
    {
        $roleId = $role instanceof Role ? $role->id : (is_string($role) ? Role::findByName($role)->id : $role);
        $editalId = $edital instanceof \App\Models\Edital ? $edital->id : $edital;

        return DB::table('model_has_roles_by_edital')
            ->where('user_id', $this->uuid)
            ->where('role_id', $roleId)
            ->where('edital_id', $editalId)
            ->delete();
    }

    /**
     * Vincula uma permissão direta a um usuário para um edital específico.
     *
     * @param string|int|\Spatie\Permission\Models\Permission $permission
     * @param \App\Models\Edital|int $edital
     * @return void
     */
    public function givePermissionToForEdital($permission, $edital): void
    {
        $permissionId = $permission instanceof Permission ? $permission->id : (is_string($permission) ? Permission::findByName($permission)->id : $permission);
        $editalId = $edital instanceof \App\Models\Edital ? $edital->id : $edital;

        DB::table('model_has_permissions_by_edital')->updateOrInsert(
            ['user_id' => $this->uuid, 'permission_id' => $permissionId, 'edital_id' => $editalId],
            ['user_id' => $this->uuid, 'permission_id' => $permissionId, 'edital_id' => $editalId]
        );
    }

    /**
     * Remove uma permissão direta de um usuário para um edital específico.
     *
     * @param string|int|\Spatie\Permission\Models\Permission $permission
     * @param \App\Models\Edital|int $edital
     * @return int
     */
    public function revokePermissionFromForEdital($permission, $edital): int
    {
        $permissionId = $permission instanceof Permission ? $permission->id : (is_string($permission) ? Permission::findByName($permission)->id : $permission);
        $editalId = $edital instanceof \App\Models\Edital ? $edital->id : $edital;

        return DB::table('model_has_permissions_by_edital')
            ->where('user_id', $this->uuid)
            ->where('permission_id', $permissionId)
            ->where('edital_id', $editalId)
            ->delete();
    }
}
