<?php

namespace App\Services\User;

use App\Exceptions\DifferentScopeException;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class ManageUserRolesAndPermissionsService implements \App\Interfaces\User\IManageUserRolesAndPermissionsService{
    public function syncAllLocalRolesAndPermissions(array $data, User $involved_user, User $author): string
    {
        try {

            $response = $this->verifyScope($data, $involved_user, 'local');

            $involved_user->syncRolesForEdital($response->roles, $data['edital_id']);
            $involved_user->syncPermissionsForEdital($response->perms, $data['edital_id']);

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

    public function syncAllGlobalRolesAndPermissions(array $data, User $involved_user, User $author): string
    {
        try {

            $response = $this->verifyScope($data, $involved_user, 'global');

            $involved_user->syncRoles($response->roles);

            $involved_user->syncPermissions($response->perms);

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

    public function verifyScope($data, User $involved_user, $scope)
    {
        $perms = Permission::findMany($data["permissions"]);
        $roles = Role::findMany($data["roles"]);

        // ==========================================================
        // Verificação de segurança para o usuário Root do sistema
        // ==========================================================
        if (
            $involved_user->uuid === env('APP_ADMIN_UUID') &&

            $scope === 'global' &&

            !$roles->contains('name', 'super-Admin')
        ) {
            throw new Exception('Não é permitido remover o cargo de super-Admin do usuário root do sistema.');
        }

        $diffentScopePerm = $perms->filter(fn($perm) => $perm->scope !== $scope);
        $diffentScopeRole = $roles->filter(fn($role) => $role->scope !== $scope);

        if(count($diffentScopePerm) || count($diffentScopeRole)){
            throw new DifferentScopeException("Dados de permissões e cargos foram enviados com escopos distintos, favor verificar.");
        }
        return (object)["roles" => $roles, "perms" => $perms];
    }
}
