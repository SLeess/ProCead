<?php

namespace App\Services\Admin\RoleService;

use App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService;
use App\Models\Role;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class RoleService implements \App\Interfaces\Admin\RoleService\IRoleService{

    public function __construct(
        private ISyncRolePermissionsService $syncRolePermissionsService
    )
    {}

    public function createRole(array $roleData): void
    {
        DB::beginTransaction();
        try {
            Role::create(array_merge($roleData, ['guard_name' => 'api']));
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Falha ao tentar criar o cargo '. $roleData['name']. '. Erro: '. $e->getMessage());
        }
    }

    public function updateRole(Role $role, array $roleData): void{
        DB::beginTransaction();
        try {
            $role->update($roleData);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Falha ao tentar atualizar o cargo '. $role->name. '. Erro: '. $e->getMessage());
        }
    }

    public function updateScopeRole(Role $role, string $scope): void
    {
        $this->syncRolePermissionsService->syncPermissionsToRole($role->id, []);
        $role->scope = $scope;
        $role->save();
    }

    public function updateRoleAndSyncPermissions(int $roleId, array $roleData): void
    {
        DB::transaction(function () use ($roleId, $roleData) {
            $role = Role::findOrFail($roleId);

            if($role->scope != $roleData['scope']){
                $this->updateScopeRole($role, $roleData["scope"]);
                $role->refresh();
            }

            $this->updateRole($role,  Arr::except($roleData, ['scope', 'id']));
        });
    }

    public function destroyRole(Role $role): void
    {
        try {
            DB::beginTransaction();
            if($role->name === 'super-Admin')
                throw new AuthorizationException("Não é permitido remover o cargo de Super Administrador.");

            $role->delete();

            DB::commit();
        } catch (AuthorizationException $e){
            DB::rollBack();
            throw new AuthorizationException($e->getMessage());
        }
        catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Falha ao tentar deletar o cargo '. $role->name. '. Erro: '. $e->getMessage());
        }
    }
}
