<?php

namespace App\Services\User;

// use App\Models\Permission;
// use App\Models\Role;

use App\Exceptions\DifferentScopeException;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class ManageUserRolesAndPermissionsService implements \App\Interfaces\User\IManageUserRolesAndPermissionsService{
    public function syncAllLocalRolesAndPermissions(array $data, User $user): string
    {
        try {

            dd("s");

            DB::commit();
            return "Permissões e cargos do usuário foram atualizados com sucesso!";
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
    public function syncAllGlobalRolesAndPermissions(array $data, User $user): string
    {

        try {
            $perms = Permission::findMany($data["global_permissions"]);
            $roles = Role::findMany($data["global_roles"]);

            $diffentScopePerm = $perms->filter(fn($perm) => $perm->scope === 'local');
            $diffentScopeRole = $roles->filter(fn($role) => $role->scope === 'local');

            if(count($diffentScopePerm) || count($diffentScopeRole)){
                throw new DifferentScopeException("Dados de permissões e cargos foram enviados com escopos distintos, favor verificar.");
            }

            $user->syncRoles($roles);

            $user->syncPermissions($perms);

            DB::commit();
            return "Permissões e cargos do usuário foram atualizados com sucesso!";
        } catch (DifferentScopeException $e){
            DB::rollBack();
            throw new DifferentScopeException($e->getMessage());
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
}
