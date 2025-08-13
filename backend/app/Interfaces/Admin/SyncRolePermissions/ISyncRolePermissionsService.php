<?php

namespace App\Interfaces\Admin\SyncRolePermissions;

use App\Models\Role;

interface ISyncRolePermissionsService{
    /**
     * Sincroniza uma lista de permissões para um único papel.
     * Remove as permissões antigas e adiciona as novas.
     *
     * @param int $roleId O ID do papel a ser atualizado.
     * @param array $permissionIds Um array com os IDs das permissões.
     * @return void
     * @throws \App\Exceptions\DifferentScopeException
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function syncPermissionsToRole(Role $role, array $permissionIds): void;

    /**
     * Atualiza os dados do cargo, como nome e nível de escopo
     * @param array $roleData
     * @return void
     */
    public function updateDataRole(Role $role, array $roleData): void;

    /**
     * Chamada dos dois métodos acima para realizar as duas operações com uma chamada
     * @param int $roleId
     * @param array $roleData
     * @param array $permissionIds
     * @return void
     */
    public function updateRoleAndSyncPermissions(int $roleId, array $roleData, array $permissionIds): void;

    /**
     * Função feita para atualizar somente o escopo de um cargo e limpar suas permissões
     * @param \App\Models\Role $role
     * @param array $scope
     * @return void
     */
    public function updateScopeRole(Role $role, string $scope): void;
}
