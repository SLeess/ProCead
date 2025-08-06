<?php

namespace App\Interfaces\Admin\SyncRolePermissions;

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
    public function syncPermissionsToRole(int $roleId, array $permissionIds): void;
}
