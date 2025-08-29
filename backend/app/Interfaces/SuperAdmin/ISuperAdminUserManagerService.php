<?php

namespace App\Interfaces\SuperAdmin;

use App\Models\User;

interface ISuperAdminUserManagerService{
    /**
     * Função para efetuar o registro de um usuário manualmente por um super-Administrador
     * @param array $data
     * @return string
     */
    public function admin_userRegister(array $data): string;

    /**
     * Função para efetuar a atualização de informações básicas de um usuário manualmente por um super-Administrador
     * @param array $data
     * @return string
     */
    public function admin_userUpdate(array $data, User $user): string;

    /**
     * Função para efetuar a atualização da senha de um usuário manualmente por um super-Administrador
     * @param array $data
     * @return string
     */
    public function admin_userUpdatePassword(array $data, User $user): string;
}
