<?php

namespace App\Interfaces\User;

use App\Http\Resources\Admin\UserResource;
use App\Http\Resources\UserDataPermissionsAndRoles;
use App\Models\User;

interface IUserService{
    /**
     * Pega os dados do perfil do usuário autenticado.
     */
    public function getProfileData(User $user): UserResource;

    /**
     * Atualiza os dados do perfil do usuário autenticado.
     */
    public function updateProfile(User $user, array $data): UserResource;

    /**
     * Pega as insformações do usuário, suas permissões e perfis.
     */
    public function getUserDataPermissions(User $user): UserDataPermissionsAndRoles;

    /**
     * Função para efetuar o registro de um usuário manualmente por um super-Administrador
     * @param array $data
     * @return string
     */
    public function admin_userRegister(array $data): string;
}
