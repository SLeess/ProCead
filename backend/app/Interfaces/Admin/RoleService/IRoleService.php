<?php

namespace App\Interfaces\Admin\RoleService;

use App\Models\Role;

interface IRoleService{
    /**
     * função para apenas atualizar os dados do cargo, como nome
     * e escopo
     * @param array $data
     * @return void
     */
    public function updateRole(Role $role, array $roleData): void;

    /**
     * Chamada dos dois métodos acima para realizar as duas operações com uma chamada.
     * Além disso, ele generaliza uma chamada pro serviço de sincronização de permissões pra caso
     * o cargo tenha seu escopo alterado, para assim remover as permissões antes de alterar o escopo
     * @param int $roleId
     * @param array $roleData
     * @return void
     */
    public function updateRoleAndSyncPermissions(int $roleId, array $roleData): void;

    /**
     * Função feita para atualizar somente o escopo de um cargo e limpar suas permissões
     * @param \App\Models\Role $role
     * @param array $scope
     * @return void
     */
    public function updateScopeRole(Role $role, string $scope): void;
}
