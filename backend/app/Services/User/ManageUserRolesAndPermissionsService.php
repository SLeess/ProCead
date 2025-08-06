<?php

namespace App\Services\User;

// use App\Models\Permission;
// use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class ManageUserRolesAndPermissionsService implements \App\Interfaces\User\IManageUserRolesAndPermissionsService{
    public function syncAllRolesAndPermissions(array $data, User $user): string
    {
        try {
            //code...
            // 1. Sincronizar Cargos Globais
            // $user->syncRoles($request->input('global_roles', []));

            // // 2. Sincronizar Permissões Globais Diretas
            // $user->syncPermissions($request->input('global_permissions', []));

            // // 3. Sincronizar Cargos por Edital
            // DB::table('model_has_roles_by_edital')->where('user_id', $user->uuid)->delete();

            // if ($request->has('edital_roles')) {
            //     foreach ($request->input('edital_roles') as $editalId => $roleNames) {
            //         foreach ($roleNames as $roleName) {
            //             $user->assignRoleForEdital($roleName, (int)$editalId); // Cast para int, pois editalId vem como string da chave JSON
            //         }
            //     }
            // }

            // // 4. Sincronizar Permissões Diretas por Edital
            // DB::table('model_has_permissions_by_edital')->where('user_id', $user->uuid)->delete();

            // if ($request->has('edital_permissions')) {
            //     foreach ($request->input('edital_permissions') as $editalId => $permissionNames) {
            //         foreach ($permissionNames as $permissionName) {
            //             $user->givePermissionToForEdital($permissionName, (int)$editalId);
            //         }
            //     }
            // }

            DB::commit();
            return "Permissões e cargos do usuário foram atualizados com sucesso!";
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
}
